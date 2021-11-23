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

!['User Dashboard'](/imgs/user-dashboard.png)

!['Transaction'](/imgs/transaction.png)

**Warehouse (Arena) List**

!['Warehouses'](/imgs/arena.png)

**Warehouse (Arena) Analytics**

!['Analytics'](/imgs/arena-analytics.png)

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
