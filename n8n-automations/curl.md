```bash
curl https://api.mistral.ai/v1/ocr\
    -H "Content-Type: application/json"\
    -H "Authorization: Bearer ${MISTRAL_API_KEY}"\
    -d '{
        "document": {
            "type": "image_url",
            "image_url": "data:image/png;base64,<base64_file>"
        },
        "model": "mistral-ocr-latest",
		"include_image_base64": true,
		"document_annotation_format": {
			"type": "json_schema",
			"json_schema": {
				"name": "response_schema",
				"schema": {
					"type": "object",
					"properties": {
						"title": {
							"any_of": [{"type":"string"}, {"type":"null"}],
							"description": "Name or title of the competition. Return null if not found."
						},
						"organizer": {
							"any_of": [{"type":"string"}, {"type":"array","items":{"type":"string"}}, {"type":"null"}],
							"description": "Competition organizer. Can be a single organizer or multiple organizers. Return null if not found."
						},
						"categories": {
							"any_of": [{"type":"string"}, {"type":"array","items":{"type":"string"}}, {"type":"null"}],
							"description": "Competition category. Return null if not found."
						},
						"level": {
							"any_of": [{"type":"string","enum":["SD","SMP","SMA","Mahasiswa","Umum"]}, {"type":"array","items":{"type":"string","enum":["SD","SMP","SMA","Mahasiswa","Umum"]}}, {"type":"null"}],
							"description": "Participant level. Return null if not found."
						},
						"start_date": {
							"any_of": [{"type":"string"}, {"type":"array","items":{"type":"string"}}, {"type":"null"}],
							"description": "Registration start date in YYYY-MM-DD format. Return null if not found."
						},
						"end_date": {
							"any_of": [{"type":"string"}, {"type":"array","items":{"type":"string"}}, {"type":"null"}],
							"description": "Registration end date in YYYY-MM-DD format. Return null if not found."
						},
						"format": {
							"any_of": [{"type":"string","enum":["Online","Offline","Hybrid"]}, {"type":"null"}],
							"description": "Competition format. Return null if not found."
						},
						"participation_type": {
							"any_of": [{"type":"string","enum":["Individual","Team"]}, {"type":"null"}],
							"description": "Participation type. Return null if not found."
						},
						"pricing": {
							"any_of": [{"type":"number"}, {"type":"string"}, {"type":"array","items":{"anyOf":[{"type":"number"},{"type":"string"}]}}, {"type":"null"}],
							"description": "Registration fee in Indonesian Rupiah. Return null if not found."
						},
						"url": {
							"any_of": [{"type":"string"}, {"type":"null"}],
							"description": "Registration URL. Return null if not found."
						},
						"location": {
							"any_of": [{"type":"string"}, {"type":"null"}],
							"description": "Country where the competition takes place, e.g. Indonesia, Malaysia, Brunei. Return null if not found."
						}
					},
					"required": [],
					"additional_properties": false
				},
				"strict": true
			}
		},
		"include_blocks": false
    }' -o ocr_output.json
```
