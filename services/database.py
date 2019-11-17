from flask import Flask
import mysql.connector
import io
import os
from google.cloud import vision
from google.cloud.vision import types
from google.oauth2 import service_account
from flask import request
import re
import base64
from datetime import datetime, timedelta
from itertools import combinations
import fastai
from fastai.vision import *
from fastai.metrics import error_rate
#from firebase import firebase
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "api_creden.json"

app = Flask(__name__)



mydb = mysql.connector.connect(
host="localhost",
user="testuser",
passwd="testuser",
database="product",
auth_plugin='mysql_native_password'
)

#firebase = firebase.FirebaseApplication("",None)


@app.route("/processImage/",methods=["POST"])
def processImageUri():
	body = request.get_json()
	data = body["data"].split(",",2)[1]
	content = base64.b64decode(data)
	client = vision.ImageAnnotatorClient()
	image = types.Image(content=content)
	response = client.label_detection(image=image)
	labels = response.label_annotations
	learned_model = load_learner("./","trained_model.pkl")
	pred_labels = learned_model.get_preds(image)
	print(pred_labels)
	max_ids = np.asarray(np.argmax(preds[0],axis=1))
	yhat = []
	for temp_max_ids in max_ids:
		yhat.append(temp_max_ids)
	
	ylabel = pred_labels[1]
	for label in labels:
		x = re.search("glass|cardboard|plastic|paper|can|metal|cup",label.description.lower())
		item = re.findall("glass|cardboard|plastic|paper|can|metal|cup", label.description.lower())
		if item == yhat[0].lower():
			print(ylabel)
			break
	return {"decision":1}




@app.route("/product/",methods=["POST"])
def insertproduct():

	list_of_items = ['apple','orange','banana','strawberry']
	client = vision.ImageAnnotatorClient()

	request_parameters = request.get_json()
	#print(request_parameters)
	content = base64.b64decode(request_parameters['image'])
	expiryd = request_parameters['expiry_date']

	image = types.Image(content=content)

	response = client.label_detection(image=image)
	labels = response.label_annotations
	mycursor = mydb.cursor()
	for label in labels:
		if re.search("apple|orange|banana|strawberry",label.description.lower()):	
			item = re.findall("apple|orange|banana|strawberry", label.description.lower())
			sql = "INSERT INTO productDetails (label, expiry_date) VALUES (%s, %s)"
			val = (str(item[0]), expiryd)
			mycursor.execute(sql, val)
			mydb.commit()
			json_value = {
				'status':'true',
				'message':'Product inserted Successfully'
				}
			return json_value
	
	mycursor.close()
	
	json_value = {
				'status':'false',
				'message':'Product inserted Successfully'
				}
	return json_value
			
		
@app.route("/expiry/products/",methods=["GET"])
def getExpiry():
	today_dates = (datetime.today()- timedelta(1)).strftime("%Y-%m-%d")

	mycursor = mydb.cursor()
	sql = "select label from productDetails where expiry_date=%s"
	mycursor.execute(sql, (today_dates,))
	products_url = []
	response_json = {}
	record = mycursor.fetchall()
	url_link = "https://api.spoonacular.com/recipes/findByIngredients?ingredients="
	subsets = []
	target  = []
	products = []
	print(record)
	for i in range(len(record)):
		for j in range(len(record[i])):
			products.append(record[i][j])
		
	#print(products)
	for r in range(1,len(products)+1):
		subsets.extend(list(combinations(products, r)))


	#print(subsets)
	for row in subsets:
		temp_element = ""
		for element in row:
			temp_element = temp_element + element + ","
		products_url.append({
			'product_Name':temp_element,
			'url' : url_link + temp_element + "&apiKey=bd4db66291ea47c3b0793ff9c047e0bc"
		
		})
	response_json['main'] = products_url
	#print(response_json)
	mycursor.close()
	return response_json

if __name__ == "__main__":
    app.run(host="10.192.199.51")




