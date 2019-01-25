import requests

response = requests.post('http://www.example.com', data={'id': '1', foo': 'bar'})
print(response.status_code)    # HTTPのステータスコード取得
print(response.text)    # レスポンスのHTMLを文字列で取得