from backend import app,db
from azure.storage.blob import ContainerClient, BlobProperties, StorageStreamDownloader
from azure.core.paging import ItemPaged
import time
#import pandas as pd
import json
from datetime import datetime

from backend.models import Instructions, GraphInfo

storage_container_fault='capstone-2020-05-19-container-5'
storage_account_access_key_capstone = "OkPkgrCiT7CXYQyoyXECqVpVSoiaebV3tWOvopiANqwCO/CWFoRLHb+P4KGqXwiMKl4iMvsGM/1opL28OUagJA=="
connection_string_capstone=r'"DefaultEndpointsProtocol=https;EndpointSuffix=core.windows.net;AccountName=capstone4;AccountKey=OkPkgrCiT7CXYQyoyXECqVpVSoiaebV3tWOvopiANqwCO/CWFoRLHb+P4KGqXwiMKl4iMvsGM/1opL28OUagJA=="'


containerClient_fault = ContainerClient.from_connection_string(connection_string_capstone,
                                                                    storage_container_fault)


blob_list_result_iterator=containerClient_fault.list_blobs()
#blob_client = containerClient_fault .upload_blob(name=name, data=json_data)
objectList=[]
count=0
for blob in blob_list_result_iterator:
  count+=1
  print(blob.name)
#print(count)


blob_iterator: ItemPaged[BlobProperties] = containerClient_fault .list_blobs()
blob_list = sorted(list(blob_iterator), key=lambda blob: blob.last_modified)  # sort by the second column

#reading the first blob only
for blob in blob_list[1:2]:
  
  stream: StorageStreamDownloader = containerClient_fault .download_blob(blob.name)
  b2 = stream.readall()
  decoded = b2.decode("utf-8")   # converts from bytes type to string
  objectList.append(decoded)



db.drop_all()
db.create_all()

for instructions in objectList:
    
    loaded_json = json.loads(instructions)
    #print(loaded_json)
    
    for item in loaded_json:


        Iname = Instructions(fault_type=item['ID'])
        db.session.add(Iname)
        db.session.commit()


        tranfer_epochtime=datetime.strptime(item['GraphInfo']['Time'], "%Y-%m-%d %H:%M:%S")
        epochtime=time.mktime(tranfer_epochtime.timetuple())
        sensor=item['GraphInfo']['Datatype']
        selected_sensors= ""

        for key in sensor:
            if sensor[key]==1:
               selected_sensors+=key
               selected_sensors+=" "

    #print(epochtime)
    #print(sensor)
    #print(selected_sensors)
        
        fault= Instructions.query.get(Iname.id)
        graph_1=GraphInfo(Time=epochtime,TimeRange=item['GraphInfo']['TimeRange'],
        sensors=selected_sensors,fault_id=fault.id)
        db.session.add(graph_1)
        db.session.commit()


instruction=Instructions.query.first()
instruction_all=Instructions.query.all()
print(instruction_all)
fault=Instructions.query.get(instruction.id)
print(fault.graphinfo)

#for info in fault.graphinfo:
#    print("id :{}\nTime: {}\nTimeRange :{}\nsensors: {}".format(info.id,info.Time,info.TimeRange,info.sensors))




@app.route('/instructions/<id>')
def detailgraph(id):
  
     info=GraphInfo.query.get(id)
     graphinfo={
        "id":info.id,
        "Time":info.Time,
        "TimeRange":info.TimeRange,
        "sensors":info.sensors
     }
     return json.dumps(graphinfo) 
        

@app.route('/instructions')
def instructions():
     name_list=[]
     #instruction=Instructions.query.first()
    
     for instruction in Instructions.query.all():
             
         name_list.append({instruction.fault_type:instruction.id})
     name_list=json.dumps(name_list)   

     return name_list
