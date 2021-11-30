# Django-Vue Shopping Cart

Django rest framework shopping cart With Vuejs frontend

---

<p align="center">
  <img src="mystore\frontend\src\assets\screenshot.png" width="500" alt="screenshot">
</p>

## Functionality Login system

- Log in
    - via username & password
- Register
- Log out
- Reset password
- Forgot password
- Change password
- Change profile
    - Customer address and phone number
- Close account

## Functionality Store

- Upload products through django admin
- Images will uploaded to AWS S3
- Star rating system

## Requirements

@vue/cli 4.5.13 | Python 3.9.4 | Nodejs v14.6.0 | Postgresql

- Database engine and email service
- AWS S3 account

## Setup django

- Clone repository

``` python
git clone https://github.com/Denisse-AB/django_store.git
cd django_store
```

- Create your virtual environment

```python
pip install pipenv

pipenv install
pipenv shell

cd mystore
```

- Configure settings.py (database connection, email and AWS)
- Run your migrations

```python
# Use py manage.py on windows

python manage.py makemigrations
python manage.py migrate
```
- Create your superuser

```python
# Use py manage.py on windows

python manage.py createsuperuser
```
- Activate local project

```python
# Use py manage.py on windows

python manage.py runserver
```

## Setup Vue

- Open new terminal

```javascript
cd mystore
cd frontend
npm install
npm run serve
```