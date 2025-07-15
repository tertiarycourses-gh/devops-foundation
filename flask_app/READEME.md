
## Setup
```sh
1. Go the Github repository on your web browser
https://github.com/tertiarycourses-gh/devops-foundation

2. Navigate to the flask_app folder (also called directory)

3. Copy the flass_app folder and all its contents. Also copy the "github-actions-demo.yaml" in the ".github/workflows" directory of the "devops-foundation" repository

4. Open your personal git repository that you've already created. If you haven't follow the steps
here: https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories

5. Paste the "flask_app" and all of its content in the root/parent directory of the repository. Also create a ".github/workflows" folder and put theh "github-actions-demo.yaml" file in it 

6. Use git shel and create a virtual environment 
```sh
python -m venv venv ## Or
python3 -m venv venv
```

7. Activate the virtual environment 
```sh
source venv/bin/activated
```

- If you encounter any issues in the virtual environment activation, refer to this: https://www.w3schools.com/python/python_virtualenv.asp

- Make your commits and push to your main branch
```sh
git add .
git commit -m "feat: setup and pipeline completed"
git push origin main
```

- Advanced:
1. To test the application, install the requirements.txt
```
pip install -r requirements.tx
```

2. Run the app
```sh
flask run  or python app.py
```

3. Play around by changing the message or adding routes in the app.py


Reach out to me for any support at: sharhan@cloudbintech.com
