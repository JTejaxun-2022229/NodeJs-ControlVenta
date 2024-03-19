GUIA PARA USO DEL API 

Al momento de ejecutar la api se hara unas inserciones automaticas que son: 
- creacion de roles: ADMIN_ROLE Y CLIENT_ROLE
- creacion de categoria por defecto: Products

User: 

Al momento de crear un usuario en el atributo de rol, se asigna por 
defecto el role de CLIENT_ROLE, para crear un usuario con rol admin se 
debe llenar el atributo de rol con `"role": "ADMIN_ROLE"`, cuando se asigna el 
atributo email existira el impedimento de no poder registrar un usuario si su
email ya esta registrado.
aparte de eso solo rol ADMIN_ROLE puede ver los demas usuarios y las validaciones 
donde se compara y el usuario a editar o eliminar coincide con el id puesto y el
token, y con usuario viene el login que esta en una coleccion aparte

Category: 

Unicamente rol ADMIN_ROLE puede usar el crud para category que es crear, ver 
las categorias, editarlas y eliminarlas.
tambien se pueden filtrar por concidencia similiar o exacta de atravez de usar
`?categoryName="lo que quiero buscar"`, los categoryName deben ser unicos de lo 
controlario y se quiere crear uno ya existente tirara un mensaje.

Product:

Cuando se crea un producto en atributo de productName debe ser unico, para 
facilidades, el atributo details es opcional si se agrega, en caso de no asignar una 
category a los productos se pondra por defecto la category que se creo al ejecutar el 
proyecto.
La creacion, edicion y eliminacion de un producto unicamente lo podran hacer 
usuarios con rol ADMIN_ROLE y la visualizacion queda disponible para cualquier usuario,
para hacer una busqueda por conincidencia similar o exacata por el atributo productName
se debe colocar esto en la ruta `?productName="lo que quiero buscar"`

Receipt:

para realizar una compra dentro del atributo productName se debe colocar el nombre del 
producto, tiene una validacion de si el producto se encurntra, en quantity 
la cantidad que se desea adquirir, esta tiene una validacion donde si la cantidad que 
se quiere adquirir es mas grande que el stock del producto, y en el apartado de userEmail 
se debe colocar un email de un usuario donde se validara si este existe.
Unicamente rol ADMIN_ROLE tiene la capacidad de ver todos los receipts y otro endpoint 
se muestran los receipts asignados a un usario en especifico por medio de id

Para todos: 

La mayoria de endpoints require de token en header como x-token, exeptuando 
login y la visuacion de los productos.




