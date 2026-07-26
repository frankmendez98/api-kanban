"Enfócate en el módulo usuarios y su autenticación.

Entidad SocialIdentity: Regístrala en 02-data-schema.md y genérala con id, id_usuario (N:1), provider, id_provider.

Autenticación Local (POST /usuarios/login):

Recibe { email, password }.

El servicio debe validar el email contra el repositorio de Usuario y comparar el password (usando bcrypt).

Autenticación Social (POST /usuarios/login/social):

Recibe { provider, token }.

El servicio debe validar el token, buscar en SocialIdentity. Si no existe, crear/vincular usuario basado en el email obtenido del token.

Estandarización:

Crea un método login en UsuarioService (o un AuthService delegado) que actúe como punto de entrada.

Estándares:

Aplica la regla de delegación: Toda la validación y búsqueda de identidades debe ocurrir en UsuarioService dedicado.

NO modifiques la entidad Usuario para añadir campos de terceros.

Regla de oro: El endpoint de login local y el de login social deben devolver el mismo formato de respuesta (ej: un JWT y los datos del usuario).

Antes de empezar: Confírmame el registro en 02-data-schema.md y cómo piensas manejar la unificación de la respuesta (el token) para que el frontend no sepa si el usuario se logueó por social o por password."