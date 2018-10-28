import os
import re
import json
import requests
from flask import Flask, request, make_response, jsonify,url_for,send_from_directory
import pygal
import cairocffi
import cairosvg
import base64






def Barchart (title,data):

	bar_chart = pygal.Bar()
	bar_chart.title = title
	data_cols = data.split(':')
	for x in range(0,len(data_cols)):
		data_num = []
		data_cols_split = data_cols[x].split(',')
		

		for y in range(1,len(data_cols_split)):	
			print(data_cols_split[y])
			data_num.append(int(data_cols_split[y]))
			
			print(data_num)
		bar_chart.add(str(data_cols_split[0]), data_num)
	


	bar_chart.render_to_png('barchart.png')
	with open("barchart.png", "rb") as imageFile:
		imgstring = base64.b64encode(imageFile.read())
	return imgstring


def Linechart (title,data):
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

def Pie (title,data):
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










app = Flask(__name__,static_folder='static')
@app.route('/')
def index():
	return send_from_directory(app.static_folder, 'index.html')

@app.route('/send',methods=['POST'])
def sendchart():

	if request.form['type'] == 'barchart':

		return Barchart(request.form['title'],request.form['data'])


	elif request.form['type'] == 'linechart':
		
		return Linechart(request.form['title'],request.form['data'])

	elif request.form['type'] == 'pie':
		
		return Pie(request.form['title'],request.form['data'])
	
	
	





	
	
	


