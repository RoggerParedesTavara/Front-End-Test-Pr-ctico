En el siguiente archivo se realizo la creación de 3 componentes principales
    ● Caja de búsqueda
    ● Resultados de la búsqueda
    ● Detalle del producto
adicionalmente se agrego un componente extra que se encargar de avisar si es que existio algun error en la oobtencion de datos, por un tema de tiempo no se pudo agregar un componente que indique al usuario la consulta que se esta llavando a cabo, sería una mejora que se podría agregar.
Adicional a esto se hizo uso de hooks como useState, useEffect, useContex.
La consulta de los datos se hace al servidor, quien es quien se encarga de mapear los datos pedidos en el test, se creo una variable de ambiente al cual estaremos llamando para hacer la consulta:
    ● Caja de Búsqueda: “/”
    ● Resultados de la búsqueda:“/items?search=”
    ● Detalle del producto: “/items/:id”