from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return {
        'message': 'Hello, world!',
        'status': 'success'
    }

@app.route('/health')
def health():
    return {
        'status': 'healthy'
    }

@app.route('/ed')
def ed():
    return {
        'message': 'Hello, Ed!',
        'greeting': 'How are you?'
    }

@app.route('/johnny')
def john():
    return {
        'message': 'Hello, John!',
        'greeting': 'How are you?'
    }

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
