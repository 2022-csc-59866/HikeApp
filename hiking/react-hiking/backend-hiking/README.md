
# Running the Application

1. Set Python Version
```
pyenv local 3.10.5
```

2. Create Virtual Environment
Windows

```
virtualenv venv
```
Mac
```
virtualenv venv
```

3. Activate Virtual Environment
Windows

```
env\Scripts\activate
```

Mac
```
pyenv activate venv
```

4. Install Project Dependencies
```
pip install -r requirements.txt
```

5. Run Application
```
python app.py
```

# Running Tests

1. Run Test
Windows
```
pythom -m pytest
```
Mac
```
PYTHONPATH=. pytest
```
