# Django-Vue Shopping Cart

Django rest framework shopping cart With Vuejs. This project provides a template for local development.

---

<p align="center">
  <img src="mystore\screenshots\screenshot(1).png" width="500" alt="screenshot">
</p>
<p align="center">
  <img src="mystore\screenshots\screenshot(2).png" width="500" alt="screenshot">
</p>
<p align="center">
  <img src="mystore\screenshots\screenshot(3).png" width="500" alt="screenshot">
</p>
<p align="center">
  <img src="mystore\screenshots\admin.png" width="500" alt="screenshot">
</p>

## Stripe Integration
[Instructions on how to connect Stripe](https://codingpr.com/stripe-vue-blog).

## Features

- Log in
    - Auth Token login
    - via username & password
- Register
- Reset password
- Forgot password
- Change password
- Change profile
    - Customer address and phone number
- Star rating system
- Inventory management system

## Functionality Store Admin

- Upload products through django admin
- Images will uploaded to AWS S3

## Requirements

@vue/cli 4.5.13 | Python 3.9.4 | Nodejs ^16.13.1 | Postgresql

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

## Donation
If you like this project, buy me a cup of :coffee: :wink:

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate?business=263QJ8D5YHR8E&no_recurring=0&item_name=I+believe+in+open+source%2C+but+a+little+donation+will+be+appreciated.+Thanks%21&currency_code=USD)
