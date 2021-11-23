# Product Locator

**Login Page**

![img 1](https://user-images.githubusercontent.com/86033480/143051989-ef07914d-7500-4421-a6c8-7b7c9153db84.png)

**Admin Dashboard**  
 
- Only Admin has the rights to create new users and warehouses. 
- A transaction could be created by any registered user.
- Admin could update or delete any transaction.

![img 2](https://user-images.githubusercontent.com/86033480/143052427-28f7d995-be06-496c-a372-226ae8f925dd.png)

**User Dashboard**  

- A registered user could view all the warehouses and transactions in the database. 
- The user could only update or delete transactions which were created by him.


![img 3](https://user-images.githubusercontent.com/86033480/143052666-3b929812-e931-4a8c-9581-835f45c3ceea.png)

![img 4](https://user-images.githubusercontent.com/86033480/143052678-07061adb-70a5-4af1-9dbd-7165d4258db9.png)

**Warehouse (Arena) List**

![img 5](https://user-images.githubusercontent.com/86033480/143052688-f144649b-9784-4194-83f2-da1af813ee28.png)

**Warehouse (Arena) Analytics**

![img 6](https://user-images.githubusercontent.com/86033480/143052698-3e975c0e-62a6-47ca-b785-7f2916e73d08.png)

## Setting Up

**Backend**

```
  $ pip install pipenv
```

**Installing Dependencies**

```
  $ pipenv install
```

**Migrating to database**

```
  $ pipenv shell 
  $ python manage.py migrate
```

**Starting Server**

```
  $ pipenv shell
  $ python manage.py runserver
```

**Frontend**

**Installing Dependencies**

```
  $ npm install
```

**Starting Server**

```
  $ npm start
```

**Creating new admin**

```
  $ python manage.py createsuperuser
```
