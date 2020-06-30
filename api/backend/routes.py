from backend import app,db
from azure.storage.blob import ContainerClient, BlobProperties, StorageStreamDownloader
from azure.core.paging import ItemPaged
import time
import pandas as pd
import json
from datetime import datetime

from backend.models import Instructions, Graphinfo,Sensor
storage_container_capstone='capstone-2020-04-30-container-4'
storage_container_fault='capstone-2020-05-19-container-5'
storage_account_access_key_capstone = "OkPkgrCiT7CXYQyoyXECqVpVSoiaebV3tWOvopiANqwCO/CWFoRLHb+P4KGqXwiMKl4iMvsGM/1opL28OUagJA=="
connection_string_capstone=r'"DefaultEndpointsProtocol=https;EndpointSuffix=core.windows.net;AccountName=capstone4;AccountKey=OkPkgrCiT7CXYQyoyXECqVpVSoiaebV3tWOvopiANqwCO/CWFoRLHb+P4KGqXwiMKl4iMvsGM/1opL28OUagJA=="'
#process and upload

def timeRangeMapEpoch(timerange, time):
  if timerange=="Past Two Weeks":
    return float(time)-1209600

containerClient_fault = ContainerClient.from_connection_string(connection_string_capstone,
                                                                    storage_container_fault)


blob_list_result_iterator=containerClient_fault.list_blobs()
#blob_client = containerClient_fault .upload_blob(name=name, data=json_data)
objectList=[]
count=0
for blob in blob_list_result_iterator:
  count+=1
  print(blob.name)


blob_iterator: ItemPaged[BlobProperties] = containerClient_fault .list_blobs()
blob_list = sorted(list(blob_iterator), key=lambda blob: blob.last_modified)  # sort by the second column

#reading the first blob only
for blob in blob_list[1:2]:
  
  stream: StorageStreamDownloader = containerClient_fault .download_blob(blob.name)
  b2 = stream.readall()
  decoded = b2.decode("utf-8")   # converts from bytes type to string
  objectList.append(decoded)



##result dataframe

containerClient_capstone = ContainerClient.from_connection_string(connection_string_capstone,
                                                                    storage_container_capstone)
#blob_list_result_iterator=containerClient_capstone.list_blobs()

blob_iterator: ItemPaged[BlobProperties] = containerClient_capstone .list_blobs()
blob_list = sorted(list(blob_iterator), key=lambda blob: blob.last_modified)  # sort by the second column

d={'Timestamp':[]}
big_frame=pd.DataFrame(data=d)

for blob in blob_list:
  
  stream: StorageStreamDownloader = containerClient_capstone .download_blob(blob.name)
  b2 = stream.readall()
  decoded = b2.decode("utf-8")   # converts from bytes type to string
  #print(decoded)

  p_frame =pd.read_json(decoded)
  big_frame = big_frame.merge(p_frame,sort=True,how='outer')
print(big_frame)
#result=big_frame[big_frame.loc[(big_frame['Timestamp']=='2019-03-09 20:59:00')].index[0]:big_frame.loc[(big_frame['Timestamp']=='2019-04-07 14:07:00')].index[0]]
#print(result)
#test=result["RTU_1 ClgCapacity(%)"]
#print(test)


#   print(dictionary)
print("result data frame is loaded")




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
        print(tranfer_epochtime.timetuple)
        epochtime=time.mktime(tranfer_epochtime.timetuple())
        #print(epochtime)
        
        sensor=item['GraphInfo']['Datatype']

        print(sensor)
        
        fault= Instructions.query.get(Iname.id)
        graph_1=Graphinfo(Time=epochtime,TimeRange=item['GraphInfo']['TimeRange'],
        fault_id=fault.id)
        db.session.add(graph_1)

        for key in sensor:
            if sensor[key]==1:
              sensor_1=Sensor(name=key,sensors_id=graph_1.id)
              graph_1.sensors.append(sensor_1)
        db.session.commit()




@app.route('/instructions/<id>')
def detailgraph(id):

     sensor_id=Graphinfo.query.get(1).fault_id
     a=Sensor.query.filter(Sensor.sensors_id==sensor_id).all()
     list_sensors=[fault.name for fault in a]

     info=Graphinfo.query.get(id)
     graphinfo={
        "id":info.id,
        "Time":info.Time,
        "TimeRange":info.TimeRange,
        "list_sensors":list_sensors

     }
  
     start_time=timeRangeMapEpoch(graphinfo["TimeRange"], graphinfo["Time"])
     print(start_time)
     date_time=datetime.fromtimestamp(start_time).strftime("%Y-%m-%d %I:%M:%S")
     print("date and time:",date_time)
     

     return json.dumps(graphinfo)

detailgraph(1)
@app.route('/')
@app.route('/instructions')
def instructions():
     name_list=[]
  
     for instruction in Instructions.query.all():
             
         name_list.append({"faultType":instruction.fault_type,
         "id":instruction.id})
     name_list=json.dumps(name_list)   

     return name_list
