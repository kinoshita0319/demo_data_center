import requests

bms_data = {'id': '1', 'battery_charge': '35'}

response = requests.post(
    'https://demo-data-center.azurewebsites.net/', data={'bms_data': bms_data})
print(response.status_code)    # HTTPのステータスコード取得
print(response.text)    # レスポンスのHTMLを文字列で取得
