from app import app

def test_hello():
    response = app.test_client().get('/')
    assert response.status_code == 200
    assert response.json == {'message': 'Hello, world!', 'status': 'success'}
    
    
def test_health():
    response = app.test_client().get('/health')
    assert response.status_code == 200
    assert response.json == {'status': 'healthy'}
    
    
# def test_ed():