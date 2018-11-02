import os
import re
import json
import requests
from flask import Flask, request, make_response, jsonify,url_for,send_from_directory
import pygal
import cairocffi
import cairosvg
import base64
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
import boto3
from ast import literal_eval
import MySQLdb
import pymysql.cursors
##mysql credentail
db = MySQLdb.connect(host="undatabase0.ci3q0gde5dmm.us-west-2.rds.amazonaws.com",    # your host, usually localhost
                     user="dan57415741",         # your username
                     passwd="oppqdd511",  # your password
                     db="uniquedatabase")

cur = db.cursor()

# Use all the SQL you like
cur.execute("SELECT * FROM YOUR_TABLE_NAME")

# print all the first cell of all the rows
for row in cur.fetchall():
    print (row[0])

db.close()


## s3 credentials
accesskey = 'AKIAIV5VJP7JFAENDCRQ'
secret = '3wyIj93kedSYYRDhFC1oL2ynn2BUzqGRJPu9Mw10'
bucket = 'bucket5741'
session = boto3.Session(
    aws_access_key_id=accesskey,
    aws_secret_access_key=secret,
)
s3 = session.resource('s3')

data = open('barchart.png', 'rb')
s3.Bucket(bucket).put_object(Key='graphs/barchartzzz.png', Body=data)
data.close()


def hello (input):

    if 'hello' in input:
        output = "Hello, how are you?"

    elif input == 'I want a barchart with title MyBarchart with categories category1 and category2 and data 2,3,4,2,3,4 and 2,3,4,3,4,3,4':
        output = Barchart('MyBarchart','category1,2,3,4,2,3,4:category2,2,3,4,3,4,3,4')


    return output




def Barchart (title,data): ##data format Category1,1,2,3,4,5:Category2,2,3,4,6,6,7,3,4,2:Category3,2,3,4,5,2,3,4

	bar_chart = pygal.Bar()
	bar_chart.title = title

	data_cols = data.split(':')
	for x in range(0,len(data_cols)):
		data_num = []
		data_cols_split = data_cols[x].split(',')


		for y in range(1,len(data_cols_split)):
			print(data_cols_split[y])
			data_num.append(int(data_cols_split[y]))


		bar_chart.add(str(data_cols_split[0]), data_num)



	bar_chart.render_to_png('barchart.png')
	with open("barchart.png", "rb") as imageFile:
		imgstring = base64.b64encode(imageFile.read())
	return (imgstring)


def Linechart (title,data): ##data format Category1,1,2,3,4,5:Category2,2,3,4,6,6,7,3,4,2:Category3,2,3,4,5,2,3,4
	line_chart = pygal.Line()
	line_chart.title = title

	data_cols = data.split(':')
	for x in range(0,len(data_cols)):
		data_num = []
		data_cols_split = data_cols[x].split(',')


		for y in range(1,len(data_cols_split)):
			print(data_cols_split[y])
			data_num.append(int(data_cols_split[y]))

			print(data_num)
		line_chart.add(str(data_cols_split[0]), data_num)



	line_chart.render_to_png('linechart.png')
	with open("linechart.png", "rb") as imageFile:
		imgstring = base64.b64encode(imageFile.read())
	return imgstring

def Pie (title,data): ##data format Category1,25:Category2,75
	pie_chart = pygal.Pie()
	pie_chart.title = title

	data_cols = data.split(':')
	for x in range(0,len(data_cols)):
		data_num = []
		data_cols_split = data_cols[x].split(',')


		for y in range(1,len(data_cols_split)):
			print(data_cols_split[y])
			data_num.append(int(data_cols_split[y]))

			print(data_num)
		pie_chart.add(str(data_cols_split[0]), data_num)



	pie_chart.render_to_png('pie.png')
	with open("pie.png", "rb") as imageFile:
		imgstring = base64.b64encode(imageFile.read())
	return imgstring

def Scatter(title,data): ## data format  category.(1,2).(2,2).(1,3):category2.(2,3).(2,3).(4,2).(4,2)
    scatter_chart = pygal.XY(stroke=False)
    scatter_chart.title = title
    data_cols = data.split(':')
    for x in range(0,len(data_cols)):
        data_num = []
        data_cols_split = data_cols[x].split('.')

        for y in range(1,len(data_cols_split)):
            print(data_cols_split[y])
            data_num.append(data_cols_split[y])


        print(data_num)
        scatter_chart.add(str(data_cols_split[0]), [literal_eval(strtuple) for strtuple in data_num])

        scatter_chart.render_to_png('scatter.png')
    with open("scatter.png", "rb") as imageFile:
        imgstring = base64.b64encode(imageFile.read())
    return imgstring



Scatter('yo','category.(1,2).(2,2).(1,3).(7,3):category2.(2,3).(2,3).(4,2).(4,2)')







app = Flask(__name__,static_folder='static')
@app.route('/')
def index():
	return send_from_directory(app.static_folder, 'index.html')

@app.route('/getid',methods=['POST'])
def getid():
    cur.execute("SELECT * images")

    # print all the first cell of all the rows
    for row in cur.fetchall():
        print (row[0])

    db.close()




@app.route('/sendout',methods=['POST'])
def inputoutput():

    return hello(request.form['user_input'])

	## return hello(request.form['user_input'],'great nice to meet you')
