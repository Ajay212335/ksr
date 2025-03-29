from flask import Flask, request, jsonify
from pymongo import MongoClient
from werkzeug.utils import secure_filename
import os
import random
from bson import ObjectId
from bson.errors import InvalidId
from flask_cors import CORS
import qrcode
import json
import numpy as np
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from geopy.geocoders import Nominatim
from datetime import datetime
from geopy.geocoders import Nominatim
from geopy.distance import geodesic

app = Flask(__name__)

CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

client = MongoClient("mongodb://localhost:27017/")
db = client['doctor_db']
registrations = db['registrations']
patients_collection = db["patients"]

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    if 'full_name' not in data or 'dob' not in data or 'phone' not in data:
        return jsonify({"message": "Missing required fields!"}), 400

    unique_id = generate_unique_id()

    user = {
        "full_name": data["full_name"],
        "dob": data["dob"],
        "phone": data["phone"],
        "unique_id": unique_id, 
        "updates": []  
    }

    try:
        result = registrations.insert_one(user)
        return jsonify({"message": "Registration successful!", "user_id": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"message": f"Error registering user: {e}"}), 500
    

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        if 'phone' not in data or 'unique_id' not in data:
            return jsonify({"message": "Missing required fields!"}), 400

        phone = data['phone']
        unique_id = data['unique_id']
        patient = patients_collection.find_one({"phone": phone, "unique_id": unique_id})

        if not patient:
            return jsonify({"message": "Invalid phone number or unique ID!"}), 401

        return jsonify({
            "message": "Login successful!",
            "patient": {
                "name": patient["name"],
                "age": patient["age"],
                "height": patient["height"],
                "weight": patient["weight"],
                "bloodGroup": patient["bloodGroup"],
                "dob": patient["dob"],
                "address": patient["address"],
                "phone": patient["phone"],
                "disease": patient["disease"],
                "medication": patient["medication"],
                "allergy": patient["allergy"],
                "aadhaarNumber": patient["aadhaarNumber"],
                "unique_id": patient["unique_id"]
            }
        }), 200

    except Exception as e:
        return jsonify({"message": f"Error during login: {str(e)}"}), 500
 
def generate_unique_id():
    return random.randint(10000000, 99999999)  

@app.route('/update/<phone>', methods=['POST'])
def update_info(phone):
    try:
        user = registrations.find_one({"phone": phone})
        if not user:
            return jsonify({"error": "User not found"}), 404

        year_of_quality = request.form['year_of_quality']
        certificate_number = request.form['certificate_number']
        certificate_file = request.files['certificate_photo']
        profile_photo = request.files['profile_photo']
        aadhar_number = request.form['aadhar_number']

        certificate_filename = secure_filename(certificate_file.filename)
        profile_filename = secure_filename(profile_photo.filename)
        certificate_path = os.path.join(app.config['UPLOAD_FOLDER'], certificate_filename)
        profile_path = os.path.join(app.config['UPLOAD_FOLDER'], profile_filename)

        certificate_file.save(certificate_path)
        profile_photo.save(profile_path)

        unique_id = generate_unique_id()

        update_data = {
            "year_of_quality": year_of_quality,
            "certificate_number": certificate_number,
            "certificate_photo": certificate_path,
            "aadhar_number": aadhar_number,
            "profile_photo": profile_path,
            "unique_id": unique_id  
        }

        registrations.update_one({"phone": phone}, {"$set": update_data})

        qr_code_data = f"http://localhost:5001/qr/{unique_id}"  

        qr_img = qrcode.make(qr_code_data)
        qr_code_path = os.path.join(app.config['UPLOAD_FOLDER'], f"{unique_id}_qr.png")
        qr_img.save(qr_code_path)

        return jsonify({
            "message": "Data updated successfully!",
            "unique_id": unique_id,
            "qr_code": qr_code_path  
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/qr/<unique_id>', methods=['GET'])
def get_qr_code(unique_id):
    try:
        qr_code_path = os.path.join(app.config['UPLOAD_FOLDER'], f"{unique_id}_qr.png")
        if not os.path.exists(qr_code_path):
            return jsonify({"error": "QR code not found"}), 404
        return app.send_static_file(qr_code_path) 
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/patient', methods=['POST'])
def register_patient():
    try:
        data = request.json
        unique_id = generate_unique_id()
        patient_data = {
            "name": data["name"],
            "age": data["age"],
            "height": data["height"],
            "weight": data["weight"],
            "bloodGroup": data["bloodGroup"],
            "dob": data["dob"],
            "address": data["address"],
            "phone": data["phone"],
            "disease": data["disease"],
            "medication": data["medication"],
            "allergy": data["allergy"],
            "aadhaarNumber": data["aadhaarNumber"], 
            "unique_id": unique_id 
        }
        result = patients_collection.insert_one(patient_data)
        if result.inserted_id:
            return jsonify({"message": "Registration successful!", "unique_id": unique_id}), 200
        else:
            return jsonify({"message": "Error registering patient. Please try again later."}), 400

    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500
def generate_unique_id():
    return 'PAT-' + str(random.randint(10000000, 99999999))  


@app.route('/patient/login', methods=['POST'])
def patient_login():
    try:
        data = request.get_json()

        if 'phone' not in data or 'unique_id' not in data:
            return jsonify({"message": "Missing required fields!"}), 400

        phone = data['phone']
        unique_id = data['unique_id']
        patient = patients_collection.find_one({"phone": phone, "unique_id": unique_id})

        if not patient:
            return jsonify({"message": "Invalid phone number or unique ID!"}), 401

        return jsonify({
            "message": "Login successful!",
            "patient": {
                "name": patient["name"],
                "age": patient["age"],
                "height": patient["height"],
                "weight": patient["weight"],
                "bloodGroup": patient["bloodGroup"],
                "dob": patient["dob"],
                "address": patient["address"],
                "phone": patient["phone"],
                "disease": patient["disease"],
                "medication": patient["medication"],
                "allergy": patient["allergy"],
                "aadhaarNumber": patient["aadhaarNumber"],
                "unique_id": patient["unique_id"]
            }
        }), 200

    except Exception as e:
        return jsonify({"message": f"Error during login: {str(e)}"}), 500
    

@app.route('/patient/<unique_id>', methods=['GET'])
def get_patient_data(unique_id):
    try:
        # Find patient by unique_id
        patient = patients_collection.find_one({"unique_id": unique_id})
        if not patient:
            return jsonify({"message": "Patient not found!"}), 404

        # Format the patient data to include all required fields
        patient_data = {
            "unique_id": patient.get("unique_id"),
            "_id": str(patient.get("_id")),  # Convert ObjectId to string
            "name": patient.get("name"),
            "age": patient.get("age"),
            "phone": patient.get("phone"),
            "bloodGroup": patient.get("bloodGroup"),
            "address": patient.get("address"),
            "dob": patient.get("dob"),
            "height": patient.get("height"),
            "weight": patient.get("weight"),
            "disease": patient.get("disease"),
            "medication": patient.get("medication"),
            "allergy": patient.get("allergy"),
            "aadhaarNumber": patient.get("aadhaarNumber"),
        }

        return jsonify(patient_data), 200
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500
@app.route('/dashboard/update/<uniqueId>', methods=['GET'])
def get_patient_info(uniqueId):
    try:
        # Query the database to fetch all patient data with the given unique_id
        patients = list(patients_collection.find({"unique_id": uniqueId}))

        if patients:
            # Convert the MongoDB _id field to string for each document
            for patient in patients:
                patient['_id'] = str(patient['_id'])

            # Return the list of patient records as a JSON response
            return jsonify(patients), 200
        else:
            return jsonify({"message": "No patients found for the given unique ID"}), 404
    except Exception as e:
        print(e)
        return jsonify({"message": "Server error"}), 500
  
        
@app.route('/dashboard/add-info/<uniqueId>', methods=['POST'])
def add_patient_info(uniqueId):
    try:
        # Get the data from the request body
        data = request.get_json()
        disease = data.get('disease')
        allergy = data.get('allergy')
        medication = data.get('medication')

        # Create a new record with the information
        new_record = {
            'unique_id': uniqueId,
            'disease': disease,
            'allergy': allergy,
            'medication': medication,
            'createdAt': datetime.now()
        }

        # Insert the new record into the collection
        result = patients_collection.insert_one(new_record)

        # Return a success message
        return jsonify({"message": "New patient information added", "id": str(result.inserted_id)}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "Server error"}), 500    



with open("/Users/ajayvishwa/Desktop/ksr_hack/backend/diseases.json", "r") as file:
    diseases = json.load(file)["diseases"]


symptom_texts = [disease["symptoms"].lower() for disease in diseases]
disease_names = [disease["name"] for disease in diseases]

# Set up TF-IDF vectorizer and transform symptom texts
vectorizer = TfidfVectorizer()
symptom_vectors = vectorizer.fit_transform(symptom_texts)

ECOMMERCE_SITES = {
    "Amazon": "https://www.amazon.com/s?k=",
    "Flipkart": "https://www.flipkart.com/search?q=",
    "1mg": "https://www.1mg.com/search/all?name=",
    "PharmEasy": "https://pharmeasy.in/search/all?name=",
    "Truemeds": "https://www.truemeds.in/search?q=",
    "Apollo Pharmacy": "https://www.apollopharmacy.in/search-medicines/",
    "MedPlusMart": "https://www.medplusmart.com/search?q=",
    "Medkart": "https://www.medkart.in/search?q=",
    "Zeelab Pharmacy": "https://www.zeelabpharmacy.com/search?q="
}

# Function to check availability of medicines
def check_medicine_availability(medicine):
    available_sites = []
    headers = {"User-Agent": "Mozilla/5.0"}
    
    for site, base_url in ECOMMERCE_SITES.items():
        search_url = f"{base_url}{medicine.replace(' ', '+')}"
        try:
            response = requests.get(search_url, headers=headers, timeout=5)
            if response.status_code == 200:
                available_sites.append((site, search_url))
        except Exception:
            pass
    return available_sites

# Function to find disease based on user symptoms
def find_disease(user_symptoms):
    user_input_vector = vectorizer.transform([user_symptoms.lower()])
    similarities = cosine_similarity(user_input_vector, symptom_vectors)
    index = np.argmax(similarities)

    if similarities[0, index] > 0.2:
        disease = diseases[index]
        medicines = disease["medicine"].split(", ")
        
        medicine_availability = {med: check_medicine_availability(med) for med in medicines}
        disease["medicine_availability"] = medicine_availability
        return disease
    return None

# Function to find nearby hospitals using Overpass API
def find_nearby_hospitals(latitude, longitude):
    overpass_url = "http://overpass-api.de/api/interpreter"
    overpass_query = f"""
    [out:json];
    node["amenity"="hospital"](around:5000,{latitude},{longitude});
    out;
    """
    response = requests.get(overpass_url, params={"data": overpass_query})
    
    if response.status_code == 200:
        data = response.json()
        hospitals = []
        for element in data.get("elements", [])[:3]:  # Limit to first 3 hospitals
            hospital_name = element.get("tags", {}).get("name", "Unknown Hospital")
            lat, lon = element["lat"], element["lon"]
            google_maps_link = f"https://www.google.com/maps?q={lat},{lon}"
            hospitals.append({
                "name": hospital_name,
                "google_maps_link": google_maps_link
            })
        return hospitals
    return []

# Flask route for chatbot interaction
@app.route("/chat", methods=["POST"])
def chatbot():
    user_message = request.json.get("message", "").lower()
    location = request.json.get("location", {})

    # Find disease based on symptoms
    matched_disease = find_disease(user_message)

    if matched_disease:
        response = f"🦠 **{matched_disease['name']}**\n\n"
        response += f"**Symptoms:** {matched_disease['symptoms']}\n"
        response += f"**Recommended Treatment:** {matched_disease['treatment']}\n"
        response += "**Recommended Medicines:**\n"

        for med, sites in matched_disease["medicine_availability"].items():
            if sites:  
                response += f"- **{med}**\n"
                for site, link in sites:
                    response += f"  - Available at {site}: [Link]({link})\n"
            else:
                response += f"- **{med}** (No availability found)\n"

        # Find nearby hospitals if location is provided
        if location:
            hospitals = find_nearby_hospitals(location)
            if hospitals:
                response += "\n**Nearby Hospitals:**\n"
                for hospital in hospitals:
                    response += f"- **{hospital['name']}**\n  Address: {hospital['vicinity']}\n"
                    response += f"  [Open in Google Maps]({hospital['google_maps_link']})\n"
            else:
                response += "\nSorry, no hospitals were found nearby."
    else:
        response = "Sorry, I couldn't find an exact match for your symptoms. Please consult a doctor for a proper diagnosis."

    return jsonify({"response": response})



if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5001)
