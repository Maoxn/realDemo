from flask import Flask
import time 
#Implement the stantdard  interface between server 
app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time':time.time()}