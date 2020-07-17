from backend import app,db
import time
import pandas as pd
import json
from datetime import datetime

from backend.order import *

d={'Timestamp':[]}
big_frame = Result

@app.route('/graphdata')
def graphdata():
  testFrame = Result[1:100]
  # testFrame['Timestamp']=testFrame['Timestamp'].dt.strftime('%Y-%m-%d %H:%M:%S')
  testList= [testFrame.columns.values.tolist()]+testFrame.values.tolist()

  return json.dumps(testList)