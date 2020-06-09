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

#big_frame=pd.DataFrame(data=d)
#print(len(blob_list))
for blob in blob_list[:1]:
  
  stream: StorageStreamDownloader = containerClient_fault .download_blob(blob.name)
  b2 = stream.readall()
  decoded = b2.decode("utf-8")   # converts from bytes type to string
  objectList.append(decoded)

#print(object_list[0][0])
loaded_json = json.loads(objectList[0])
#print(loaded_json[0])


# @app.route("/datset")
# def dataset():
#     return posts



#@app.route("/instructions")
#def Instructions():
    
#    instructions = Instructions(username=form.username.data, email=form.email.data, password=hashed_password)
#    db.session.add(user)
#    db.session.commit()
#    return posts
#print(len(objectList[0]))

db.create_all()
#db.drop_all()
for index,instructions in enumerate(loaded_json,1):


    Instructions_index="instructions"+str(index)
   # print(Instructions_index)

    Iname = Instructions(fault_type=instructions['ID'])
    db.session.add(Iname)
    db.session.commit()


    tranfer_epochtime=datetime.strptime(instructions['GraphInfo']['Time'], "%Y-%m-%d %H:%M:%S")
    epochtime=time.mktime(tranfer_epochtime.timetuple())
    sensor=instructions['GraphInfo']['Datatype']
    selected_sensors= ""

    for key in sensor:
        if sensor[key]==1:
            selected_sensors+=key
            selected_sensors+=" "
    #print(epochtime)
    #print(sensor)

    #print(selected_sensors)

    fault= Instructions.query.get(1)
    graph_1=GraphInfo(Time=epochtime,TimeRange=instructions['GraphInfo']['TimeRange'],
    sensors=selected_sensors,fault_id=fault.id)
    db.session.add(graph_1)
    db.session.commit() 
a=Instructions.query.first()
fault=Instructions.query.get(a.id)
print(fault.graphinfo)
