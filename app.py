import os
import re
import json
import requests
from flask import Flask, request, make_response, jsonify,url_for,send_from_directory
import pygal
import cairocffi
import cairosvg
import base64




line_chart = pygal.Bar()
line_chart.title = 'Browser usage evolution (in %)'
line_chart.x_labels = map(str, range(2002, 2013))
line_chart.add('Firefox', [None, None, 0, 16.6,   25,   31, 36.4, 45.5, 46.3, 42.8, 37.1])
line_chart.render_to_png('barchart.png')










app = Flask(__name__,static_folder='static')
@app.route('/')
def index():
	return send_from_directory(app.static_folder, 'index.html')

@app.route('/send',methods=['POST'])
def sendgraph():
	print(request.form['hello'])

	with open("barchart.png", "rb") as imageFile:
		imgstring = base64.b64encode(imageFile.read())
	return imgstring


