import pymysql.cursors
from ast import literal_eval
import boto3
import os
import re
import json
import requests
from flask import Flask, request, make_response, jsonify, url_for, send_from_directory
import pygal
import cairocffi
import cairosvg
import base64
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# mysql credentail
hostz = "undatabase0.ci3q0gde5dmm.us-west-2.rds.amazonaws.com"
userz = "dan57415741"
passwordz ="oppqdd511"
database = 'innodb'


# s3 credentials
accesskey = 'AKIAIV5VJP7JFAENDCRQ'
secret = '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'
bucket = 'bucket5741'
session = boto3.Session(
    aws_access_key_id=accesskey,
    aws_secret_access_key=secret,
)



def hello(id, input):
    # inputs the input into sql database
    connection = pymysql.connect(host=hostz,
                         user=userz,
                         password=passwordz,
                         )
    with connection.cursor() as cursor:

            sql = "INSERT INTO " + database +"." + id + \
                " (transcript) Values('User: "+input+"') "
            cursor.execute(sql)

    connection.commit()

# Create your natural learning models here. You must always have an output
    if 'hello' in input:
        output = "Hello, how are you?"

    elif input == 'I want a barchart with title MyBarchart with categories category1 and category2 and data 2,3,4,2,3,4 and 2,3,4,3,4,3,4':
        output = Barchart(id, 'MyBarchart',
                          'category1,2,3,4,2,3,4:category2,2,3,4,3,4,3,4')

    else:
        output = 'I do not understand.'


#################################
# logic to output into sql database
    if isinstance(output, (bytes)) == True:

        with connection.cursor() as cursor:

                sql = "INSERT INTO " + database +"." + id + \
                    " (transcript) Values('Bot: Graph created with name "+str(id)+".png')"
                cursor.execute(sql)

                connection.commit()
    elif isinstance(output, (bytes)) == False:

        with connection.cursor() as cursor:

                sql = "INSERT INTO " + database +"." + id + \
                    " (transcript) Values('Bot: "+output+"') "
                cursor.execute(sql)

                connection.commit()
    connection.close()
    return output


# data format Category1,1,2,3,4,5:Category2,2,3,4,6,6,7,3,4,2:Category3,2,3,4,5,2,3,4
def Barchart(id, title, data):

    bar_chart = pygal.Bar()
    bar_chart.title = title

    data_cols = data.split(':')
    for x in range(0, len(data_cols)):
        data_num = []
        data_cols_split = data_cols[x].split(',')

        for y in range(1, len(data_cols_split)):
            print(data_cols_split[y])
            data_num.append(int(data_cols_split[y]))

        bar_chart.add(str(data_cols_split[0]), data_num)

    bar_chart.render_to_png('barchart.png')


    s3 = session.resource('s3')
    data = open('barchart.png', 'rb')
    amazonname = str(id) + '.png'
    s3.Bucket(bucket).put_object(Key=amazonname, Body=data)
    data.close()
    with open("barchart.png", "rb") as imageFile:
        imgstring = base64.b64encode(imageFile.read())



    return (imgstring)


# data format Category1,1,2,3,4,5:Category2,2,3,4,6,6,7,3,4,2:Category3,2,3,4,5,2,3,4
def Linechart(id, title, data):
    line_chart = pygal.Line()
    line_chart.title = title

    data_cols = data.split(':')
    for x in range(0, len(data_cols)):
        data_num = []
        data_cols_split = data_cols[x].split(',')

        for y in range(1, len(data_cols_split)):
            print(data_cols_split[y])
            data_num.append(int(data_cols_split[y]))

            print(data_num)
        line_chart.add(str(data_cols_split[0]), data_num)

    line_chart.render_to_png('linechart.png')
    s3 =session.resource('s3')
    data = open('linechart.png', 'rb')
    amazonname = str(id) + '.png'
    s3.Bucket(bucket).put_object(Key=amazonname, Body=data)
    data.close()
    with open("linechart.png", "rb") as imageFile:
        imgstring = base64.b64encode(imageFile.read())
    return imgstring

def Pie (id,title,data): ##data format Category1,25:Category2,75
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
    s3 =session.resource('s3')
    data = open('pie.png', 'rb')
    amazonname = str(id) + '.png'
    s3.Bucket(bucket).put_object(Key=amazonname, Body=data)
    data.close()
    with open("pie.png", "rb") as imageFile:
        imgstring = base64.b64encode(imageFile.read())
    return imgstring

def Scatter(id,title,data): ## data format  category.(1,2).(2,2).(1,3):category2.(2,3).(2,3).(4,2).(4,2)
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
        s3 =session.resource('s3')
        data = open('scatter.png', 'rb')
        amazonname = str(id) + '.png'
        s3.Bucket(bucket).put_object(Key=amazonname, Body=data)
        data.close()
    with open("scatter.png", "rb") as imageFile:
        imgstring = base64.b64encode(imageFile.read())
    return imgstring











app = Flask(__name__,static_folder='static')
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/getid',methods=['POST'])
def getid():
    newid = 0
    connection = pymysql.connect(host=hostz,    # your host, usually localhost
                         user=userz,         # your username
                         password=passwordz,  # your password
                         )
    with connection.cursor() as cursor:


            sql = "SELECT * FROM " + database + ".images ORDER BY ID DESC LIMIT 1"
            cursor.execute(sql)
            result = cursor.fetchone()
            newid  = result[0] + 1
    connection.commit()

    with connection.cursor() as cursor:


            sql = "INSERT INTO " + database +".images (id) Values("+ str(newid)+ ")"
            cursor.execute(sql)


    connection.commit()





    with connection.cursor() as cursor:


            sql = "CREATE TABLE `"+ database +"`.`"+ str(newid) +"` (`id` INT NOT NULL AUTO_INCREMENT,`transcript` VARCHAR(10000) NULL,PRIMARY KEY (`id`),UNIQUE INDEX `id_UNIQUE` (`id` ASC));"
            cursor.execute(sql)
    connection.commit()


    connection.close()
    return str(newid)




@app.route('/sendout',methods=['POST'])
def inputoutput():

    return hello(request.form['id'],request.form['user_input'])

    # return hello(request.form['user_input'],'great nice to meet you')
