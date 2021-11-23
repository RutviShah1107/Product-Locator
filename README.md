# Product Locator

**Login Page**

!['Login Page'](/img 1.png)

**Admin Dashboard**  
 
- Only Admin has the rights to create new users and warehouses. 
- A transaction could be created by any registered user.
- Admin could update or delete any transaction.

!['Admin Dashboard'](/imgs/admin-dashboard.png)

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
