import time
from flask import Flask

app = Flask(__name__)
app.config['DEBUG']=False
@app.route('/time')
def get_current_time():
    print("hi")
    return {'time': time.time()}
