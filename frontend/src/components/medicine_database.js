const medicineDatabase = {
    "cold": {
        "details": "Rest, plenty of fluids, and over-the-counter cold remedies may help.",
        "tablets": {
            "Paracetamol": {
                "details": "Paracetamol is a common pain reliever and fever reducer.",
                "dosage": "Take 1 tablet every 4-6 hours as needed. Do not exceed 4g (8 tablets) per day.",
                "side_effects": "Common side effects may include nausea, stomach pain, or headache.",
                "when_to_take": "Can be taken with or without food."
            },
            "Aspirin": {
                "details": "Aspirin is used to relieve pain, reduce inflammation, and lower fever.",
                "dosage": "Take 1 tablet every 4 hours as needed. Do not exceed 4g (8 tablets) per day.",
                "side_effects": "Common side effects may include stomach upset, heartburn, or drowsiness.",
                "when_to_take": "Take with food to reduce stomach upset."
            }
        }
    },
    "fever": {
        "details": "Rest, drink plenty of fluids, and take fever-reducing medication.",
        "tablets": {
            "Ibuprofen": {
                "details": "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used to relieve pain and reduce fever.",
                "dosage": "Take 1 tablet every 6-8 hours as needed. Do not exceed 3.2g (6 tablets) per day.",
                "side_effects": "Common side effects may include stomach pain, heartburn, or dizziness.",
                "when_to_take": "Take with food."
            },
            "Acetaminophen": {
                "details": "Acetaminophen is used to relieve mild to moderate pain and reduce fever.",
                "dosage": "Take 1-2 tablets every 4-6 hours as needed. Do not exceed 4g (8 tablets) per day.",
                "side_effects": "Common side effects may include nausea, loss of appetite, or rash.",
                "when_to_take": "Can be taken with or without food."
            }
        }
    },
    "headache": {
        "details": "Rest in a quiet, dark room and avoid bright lights and loud noises. Over-the-counter pain relievers may help.",
        "tablets": {
            "Ibuprofen": {
                "details": "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used to relieve pain and reduce inflammation.",
                "dosage": "Take 1 tablet every 4-6 hours as needed. Do not exceed 6 tablets per day.",
                "side_effects": "Common side effects may include upset stomach, heartburn, or dizziness.",
                "when_to_take": "Take with food."
            },
            "Acetaminophen": {
                "details": "Acetaminophen is a pain reliever and fever reducer.",
                "dosage": "Take 1 or 2 tablets every 4-6 hours as needed. Do not exceed 4g (8 tablets) per day.",
                "side_effects": "Common side effects may include liver damage, especially with high doses or long-term use.",
                "when_to_take": "Can be taken with or without food."
            }
        }
    },
    "flu": {
        "details": "Rest, drink plenty of fluids, and take over-the-counter flu remedies. Antiviral medications may help shorten the duration of symptoms.",
        "tablets": {
            "Oseltamivir": {
                "details": "Oseltamivir is an antiviral medication used to treat influenza (flu) infections.",
                "dosage": "Take 1 tablet twice daily for 5 days.",
                "side_effects": "Common side effects may include nausea, vomiting, or diarrhea.",
                "when_to_take": "Take with food if stomach upset occurs."
            },
            "Zanamivir": {
                "details": "Zanamivir is an antiviral medication used to treat and prevent influenza (flu) infections.",
                "dosage": "Inhale 2 inhalations (10 mg) twice daily for 5 days using a special inhaler device.",
                "side_effects": "Common side effects may include headache, dizziness, or cough.",
                "when_to_take": "Not applicable."
            }
        }
    },
    "allergy": {
        "details": "Avoid allergens whenever possible. Antihistamines may help relieve symptoms.",
        "tablets": {
            "Loratadine": {
                "details": "Loratadine is an antihistamine used to relieve symptoms of allergy, such as sneezing, runny nose, and itching.",
                "dosage": "Take 1 tablet daily as needed.",
                "side_effects": "Common side effects may include headache, dry mouth, or drowsiness.",
                "when_to_take": "Can be taken with or without food."
            },
            "Cetirizine": {
                "details": "Cetirizine is an antihistamine used to relieve symptoms of allergy, such as sneezing, runny nose, and itching.",
                "dosage": "Take 1 tablet daily as needed.",
                "side_effects": "Common side effects may include drowsiness, dry mouth, or headache.",
                "when_to_take": "Can be taken with or without food."
            }
        }
    },
    "asthma": {
        "details": "Avoid triggers that can worsen asthma symptoms, such as smoke, dust, and pollen. Use inhalers as prescribed by a doctor.",
        "tablets": {
            "Albuterol": {
                "details": "Albuterol is a bronchodilator used to relieve bronchospasm in conditions such as asthma and chronic obstructive pulmonary disease (COPD).",
                "dosage": "Take 1 or 2 inhalations every 4-6 hours as needed.",
                "side_effects": "Common side effects may include headache, tremor, or palpitations.",
                "when_to_take": "Not applicable."
            },
            "Fluticasone": {
                "details": "Fluticasone is a corticosteroid used to prevent asthma attacks and treat symptoms such as wheezing and shortness of breath.",
                "dosage": "Take 2 inhalations twice daily.",
                "side_effects": "Common side effects may include sore throat, hoarseness, or thrush.",
                "when_to_take": "Not applicable."
            }
        }
    },
    "hypertension": {
        "details": "Monitor blood pressure regularly. Maintain a healthy diet, exercise regularly, and avoid smoking and excessive alcohol consumption.",
        "tablets": {
            "Lisinopril": {
                "details": "Lisinopril is an angiotensin-converting enzyme (ACE) inhibitor used to treat high blood pressure and heart failure.",
                "dosage": "Take 1 tablet daily.",
                "side_effects": "Common side effects may include dizziness, headache, or dry cough.",
                "when_to_take": "Can be taken with or without food."
            },
            "Amlodipine": {
                "details": "Amlodipine is a calcium channel blocker used to treat high blood pressure and chest pain (angina).",
                "dosage": "Take 1 tablet daily.",
                "side_effects": "Common side effects may include swelling of the ankles, dizziness, or flushing.",
                "when_to_take": "Can be taken with or without food."
            }
        }
    },
    "diabetes": {
        "details": "Monitor blood sugar levels regularly. Follow a healthy diet, exercise regularly, and take medication as prescribed by a doctor.",
        "tablets": {
            "Metformin": {
                "details": "Metformin is a biguanide antidiabetic medication used to treat type 2 diabetes.",
                "dosage": "Take 1 tablet twice daily with meals.",
                "side_effects": "Common side effects may include nausea, diarrhea, or abdominal discomfort.",
                "when_to_take": "Take with meals to reduce gastrointestinal side effects."
            },
            "Gliclazide": {
                "details": "Gliclazide is a sulfonylurea antidiabetic medication used to treat type 2 diabetes.",
                "dosage": "Take 1 tablet daily with breakfast.",
                "side_effects": "Common side effects may include hypoglycemia (low blood sugar), weight gain, or gastrointestinal upset.",
                "when_to_take": "Take with breakfast."
            }
        }
    },
    "acid reflux": {
        "details": "Avoid trigger foods that can worsen symptoms, such as spicy or fatty foods. Eat smaller meals and avoid lying down after eating.",
        "tablets": {
            "Omeprazole": {
                "details": "Omeprazole is a proton pump inhibitor (PPI) used to reduce stomach acid production and treat conditions such as heartburn and gastroesophageal reflux disease (GERD).",
                "dosage": "Take 1 tablet daily before breakfast.",
                "side_effects": "Common side effects may include headache, diarrhea, or abdominal pain.",
                "when_to_take": "Take before breakfast."
            },
            "Ranitidine": {
                "details": "Ranitidine is an H2 receptor antagonist used to reduce stomach acid production and treat conditions such as heartburn and GERD.",
                "dosage": "Take 1 tablet twice daily before meals.",
                "side_effects": "Common side effects may include headache, dizziness, or constipation.",
                "when_to_take": "Take before meals."
            }
        }
    },
    "migraine": {
        "details": "Identify and avoid triggers that can precipitate migraine attacks, such as certain foods, stress, or hormonal changes.",
        "tablets": {
            "Sumatriptan": {
                "details": "Sumatriptan is a serotonin receptor agonist used to relieve migraine headaches.",
                "dosage": "Take 1 tablet at the onset of a migraine attack. If symptoms persist, a second dose may be taken after 2 hours.",
                "side_effects": "Common side effects may include chest tightness, flushing, or tingling sensations.",
                "when_to_take": "Not applicable."
            },
            "Propranolol": {
                "details": "Propranolol is a beta-blocker used to prevent migraine headaches.",
                "dosage": "Take 1 tablet twice daily.",
                "side_effects": "Common side effects may include fatigue, dizziness, or slow heart rate.",
                "when_to_take": "Can be taken with or without food."
            }
        }
    },
    "insomnia": {
        "details": "Practice good sleep hygiene, such as maintaining a regular sleep schedule, avoiding caffeine and electronics before bedtime, and creating a comfortable sleep environment.",
        "tablets": {
            "Zolpidem": {
                "details": "Zolpidem is a sedative-hypnotic medication used to treat insomnia.",
                "dosage": "Take 1 tablet at bedtime as needed.",
                "side_effects": "Common side effects may include drowsiness, dizziness, or headache.",
                "when_to_take": "Take immediately before bedtime."
            },
            "Diphenhydramine": {
                "details": "Diphenhydramine is an antihistamine with sedative properties used to treat insomnia.",
                "dosage": "Take 1 tablet at bedtime as needed.",
                "side_effects": "Common side effects may include dry mouth, drowsiness, or blurred vision.",
                "when_to_take": "Take immediately before bedtime."
            }
        }
    },
    "anxiety": {
        "details": "Practice relaxation techniques, such as deep breathing and mindfulness meditation. Seek support from a therapist or counselor.",
        "tablets": {
            "Alprazolam": {
                "details": "Alprazolam is a benzodiazepine medication used to treat anxiety and panic disorders.",
                "dosage": "Take 0.25-0.5 mg 3 times daily as needed.",
                "side_effects": "Common side effects may include drowsiness, dizziness, or blurred vision.",
                "when_to_take": "Can be taken with or without food."
            },
            "Buspirone": {
                "details": "Buspirone is an anxiolytic medication used to treat generalized anxiety disorder.",
                "dosage": "Take 5-10 mg 2-3 times daily.",
                "side_effects": "Common side effects may include dizziness, headache, or nausea.",
                "when_to_take": "Can be taken with or without food."
            }
        }
    },
    "depression": {
        "details": "Engage in regular physical activity, maintain a healthy diet, and seek support from friends, family, or a therapist.",
        "tablets": {
            "Sertraline": {
                "details": "Sertraline is a selective serotonin reuptake inhibitor (SSRI) antidepressant used to treat depression and anxiety disorders.",
                "dosage": "Take 50-200 mg once daily.",
                "side_effects": "Common side effects may include nausea, diarrhea, or insomnia.",
                "when_to_take": "Can be taken with or without food."
            },
            "Bupropion": {
                "details": "Bupropion is an atypical antidepressant used to treat depression and seasonal affective disorder.",
                "dosage": "Take 150-300 mg once daily.",
                "side_effects": "Common side effects may include dry mouth, insomnia, or agitation.",
                "when_to_take": "Can be taken with or without food."
            }
        }
    },
    "gastroenteritis": {
        "details": "Stay hydrated by drinking clear fluids and electrolyte solutions. Avoid solid foods until vomiting and diarrhea have subsided.",
        "tablets": {
            "Loperamide": {
                "details": "Loperamide is an antidiarrheal medication used to treat diarrhea.",
                "dosage": "Take 4 mg initially, then 2 mg after each loose stool. Do not exceed 16 mg per day.",
                "side_effects": "Common side effects may include constipation, abdominal cramps, or dizziness.",
                "when_to_take": "Not applicable."
            },
            "Ondansetron": {
                "details": "Ondansetron is an antiemetic medication used to treat nausea and vomiting.",
                "dosage": "Take 4-8 mg 3 times daily as needed.",
                "side_effects": "Common side effects may include headache, constipation, or dizziness.",
                "when_to_take": "Not applicable."
            }
        }
    },
    "conjunctivitis": {
        "details": "Avoid rubbing the eyes. Practice good hygiene, such as washing hands frequently and avoiding sharing towels or pillows.",
        "tablets": {
            "Olopatadine": {
                "details": "Olopatadine is an antihistamine and mast cell stabilizer used to treat allergic conjunctivitis.",
                "dosage": "Instill 1 drop in each affected eye twice daily.",
                "side_effects": "Common side effects may include burning or stinging in the eyes.",
                "when_to_take": "Not applicable."
            },
            "Ofloxacin": {
                "details": "Ofloxacin is an antibiotic eye drop used to treat bacterial conjunctivitis.",
                "dosage": "Instill 1-2 drops in each affected eye 4 times daily for 7 days.",
                "side_effects": "Common side effects may include eye irritation, itching, or redness.",
                "when_to_take": "Not applicable."
            }
        }
    },

    "high_cholesterol": {
        "details": "Follow a heart-healthy diet low in saturated and trans fats. Exercise regularly and maintain a healthy weight.",
        "tablets": {
            "Atorvastatin": {
                "details": "Atorvastatin is a statin medication used to lower cholesterol levels and reduce the risk of heart disease.",
                "dosage": "Take 1 tablet daily.",
                "side_effects": "Common side effects may include muscle pain, diarrhea, or liver problems.",
                "when_to_take": "Can be taken with or without food."
            },
            "Simvastatin": {
                "details": "Simvastatin is a statin medication used to lower cholesterol levels and reduce the risk of heart disease.",
                "dosage": "Take 1 tablet daily in the evening.",
                "side_effects": "Common side effects may include muscle pain, diarrhea, or liver problems.",
                "when_to_take": "Take in the evening with or without food."
            }
        }
    },
    "urinary_tract_infection": {
        "details": "Drink plenty of water and urinate frequently to flush out bacteria. Avoid holding urine for long periods.",
        "tablets": {
            "Trimethoprim": {
                "details": "Trimethoprim is an antibiotic used to treat urinary tract infections.",
                "dosage": "Take 1 tablet twice daily for 3 days.",
                "side_effects": "Common side effects may include nausea, vomiting, or diarrhea.",
                "when_to_take": "Can be taken with or without food."
            },
            "Ciprofloxacin": {
                "details": "Ciprofloxacin is an antibiotic used to treat urinary tract infections.",
                "dosage": "Take 1 tablet twice daily for 3 days.",
                "side_effects": "Common side effects may include nausea, diarrhea, or headache.",
                "when_to_take": "Take with plenty of water and stay hydrated."
            }
        }
    },
    "rheumatoid_arthritis": {
        "details": "Follow an exercise plan designed by a physical therapist to improve joint flexibility and muscle strength.",
        "tablets": {
            "Methotrexate": {
                "details": "Methotrexate is a disease-modifying antirheumatic drug (DMARD) used to treat rheumatoid arthritis.",
                "dosage": "Take 2.5-25 mg once weekly.",
                "side_effects": "Common side effects may include nausea, vomiting, or hair loss.",
                "when_to_take": "Take with or without food."
            },
            "Prednisone": {
                "details": "Prednisone is a corticosteroid used to reduce inflammation and suppress the immune system.",
                "dosage": "Take as directed by your doctor.",
                "side_effects": "Common side effects may include weight gain, mood swings, or insomnia.",
                "when_to_take": "Take with food to reduce stomach upset."
            }
        }
    },
    "osteoarthritis": {
        "details": "Maintain a healthy weight to reduce stress on weight-bearing joints. Engage in low-impact exercises to improve joint function.",
        "tablets": {
            "Acetaminophen": {
                "details": "Acetaminophen is a pain reliever used to treat osteoarthritis.",
                "dosage": "Take 1-2 tablets every 4-6 hours as needed.",
                "side_effects": "Common side effects may include liver damage with high doses or long-term use.",
                "when_to_take": "Can be taken with or without food."
            },
            "Ibuprofen": {
                "details": "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used to reduce pain and inflammation.",
                "dosage": "Take 1 tablet every 6-8 hours as needed.",
                "side_effects": "Common side effects may include stomach upset or bleeding.",
                "when_to_take": "Take with food or milk to reduce stomach upset."
            }
        }
    },
    "osteoporosis": {
        "details": "Consume a diet rich in calcium and vitamin D. Engage in weight-bearing exercises to strengthen bones.",
        "tablets": {
            "Alendronate": {
                "details": "Alendronate is a bisphosphonate medication used to treat osteoporosis.",
                "dosage": "Take 1 tablet once weekly on an empty stomach.",
                "side_effects": "Common side effects may include stomach upset, heartburn, or difficulty swallowing.",
                "when_to_take": "Take on an empty stomach in the morning with a full glass of water."
            },
            "Calcium supplements": {
                "details": "Calcium supplements are used to prevent or treat calcium deficiency.",
                "dosage": "Take as directed by your doctor or on the product label.",
                "side_effects": "Common side effects may include constipation or stomach upset.",
                "when_to_take": "Take with food to enhance absorption and reduce stomach upset."
            }
        }
    },
    "gout": {
        "details": "Limit intake of foods high in purines, such as red meat and seafood. Stay hydrated by drinking plenty of water.",
        "tablets": {
            "Colchicine": {
                "details": "Colchicine is a medication used to relieve gout pain and inflammation.",
                "dosage": "Take 2 tablets initially, followed by 1 tablet one hour later. Do not exceed 3 tablets in 1 hour.",
                "side_effects": "Common side effects may include diarrhea, nausea, or vomiting.",
                "when_to_take": "Can be taken with or without food."
            },
            "Allopurinol": {
                "details": "Allopurinol is a medication used to lower uric acid levels in the blood and prevent gout attacks.",
                "dosage": "Take as directed by your doctor.",
                "side_effects": "Common side effects may include rash, stomach upset, or liver problems.",
                "when_to_take": "Take with food to reduce stomach upset."
            }
        }
    }
};
export default medicineDatabase;