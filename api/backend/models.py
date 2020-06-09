from datetime import datetime
from backend import db


class Instructions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fault_type= db.Column(db.String(20), nullable=False)
    graphinfo = db.relationship('GraphInfo', backref='fault', lazy=True)
    def __repr__(self):
        return f"Instructions('{self.fault_type}')"


class GraphInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    Time = db.Column(db.String(20), nullable=False)
    TimeRange= db.Column(db.String(20), nullable=False)
    sensors = db.Column(db.String(100), nullable=False)
    fault_id = db.Column(db.Integer, db.ForeignKey('instructions.id'), nullable=False)

    def __repr__(self):
        return f"GraphInfo('{self.sensors}', '{self.Time}')"


# class Bigdata(db.Model):

