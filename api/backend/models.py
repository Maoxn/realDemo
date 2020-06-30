from datetime import datetime
from backend import db


class Instructions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fault_type= db.Column(db.String(20), nullable=False)
    graphinfo = db.relationship('Graphinfo', backref='fault_type', lazy='select')
    def __repr__(self):
        return f"Instructions('{self.fault_type}')"


class Graphinfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    Time = db.Column(db.String(20), nullable=False)
    TimeRange= db.Column(db.String(20), nullable=False)
    sensors = db.relationship("Sensor",backref="graphinfo",lazy=True)
    fault_id = db.Column(db.Integer, db.ForeignKey('instructions.id'), nullable=False)

    def __repr__(self):
        return f"Graphinfo({self.Time}')"

class Sensor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sensors_id = db.Column(db.Integer, db.ForeignKey('graphinfo.id'), nullable=False)
    name=db.Column(db.String(80))




