import requests

bms_data = {'id': '1', 'battery_charge': '35'}

response = requests.post('http://localhost:3000', data={'bms_data': bms_data})
print(response.status_code)    # HTTPのステータスコード取得
print(response.text)    # レスポンスのHTMLを文字列で取得
