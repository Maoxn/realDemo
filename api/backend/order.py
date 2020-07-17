import glob
import pandas as pd
import json
import datetime


#gathering csv data using glob from DBFS (old method)
all_csv_files = glob.glob("backend/2019/*.csv")
print("--" + str(all_csv_files))
loops=len(all_csv_files)

def monthstime(month):
        if month =='Jan':  
            return 0
        elif month == 'Feb':  
            return 31
                     
        elif month ==  'Mar':  
            return 31+29
                   
        elif month == 'Apr':  
            return 31+29+31
                     
        elif month == 'May':  
            return 31+29+31+30
                     
        elif month == 'Jun':  
            return 31+29+31+30+31
                     
        elif month == 'Jul':  
            return 31+29+31+30+31+30
                     
        elif month == 'Aug':  
            return 31+29+31+30+31+30+31
                     
        elif month == 'Sep':  
            return 31+29+31+30+31+30+31+31
                     
        elif month == 'Oct': 
            return 31+29+31+30+31+30+31+31+30
                     
        elif month == 'Nov': 
            return 31+29+31+30+31+30+31+31+30+31
                     
        elif month == 'Dec': 
            return 31+29+31+30+31+30+31+31+30+31+30
                     
        


#takes x the data frame with timestamp in column 0, and y a blank data frame 1 colum x len(x) rows to be appended to x at the end
def TS2Sec(x):
    loops=len(x)
    y=pd.DataFrame([])
    for i in range(loops):
        total=0
        month=x.iloc[i,0]
        #days month is dd-MMM-YY HH:mm:ss am or pm
        temp=month.split('-')[0]
        month=month.split('-')[1]+'-'+month.split('-')[2]
        total+=int(temp)*24*60**2
        #since we are counting from 1970 added 11 days for leap years and what not.
        #months month is MMM-YY HH:mm:ss am or pm
        temp=month.split('-')[0]
        month=month.split('-')[1]
        total+=monthstime(temp)*24*60**2
        #year month is YY HH:mm:ss am or pm
        temp=month.split(' ')[0]
        month=month.split(' ')[1]+' '+month.split(' ')[2]
        total+=(int(temp)+30)*365*24*60**2
        #hours month is HH:mm:ss am or pm
        temp=month.split(':')[0]
        month=month.split(':')[1]+':'+month.split(':')[2]
        total+=int(temp)*60**2
        #minutes month is mm:ss am or pm
        temp=month.split(':')[0]
        month=month.split(':')[1]
        total+=int(temp)*60
        #seconds month is ss am or pm
        temp=month.split(' ')[0]
        month=month.split(' ')[1]
        total+=int(temp)*60
        #am/pm month is am or pm
        if month == 'pm':
            total+=12*60**2 
        x.iloc[i,0]=total


Result = pd.DataFrame()
for i in range(int(loops)):
    
    if i == int(loops-1):
      globals() ['df'+str(i)] = pd.read_csv(all_csv_files[0])
      
    else:
      globals() ['df'+str(i)] = pd.read_csv(all_csv_files[int(i+1)])
      
    if i == 0:
      
      Result = df0
      TS2Sec(Result)

    else:
      TS2Sec(globals() ['df'+str(i)])
#       globals() ['df'+str(i)]
      Result = Result.merge(globals() ['df'+str(i)], on=['Timestamp'],sort=True,how='outer')

json_frame=pd.DataFrame.to_json(Result)

