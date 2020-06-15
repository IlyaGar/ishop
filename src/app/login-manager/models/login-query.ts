export class LoginQuery{
    constructor(
        /// <summary>
        /// Логин пользователя Active Directory
        /// </summary>
        public login: string,
        
        /// <summary>
        /// Пароль пользователя Active Directory
        /// </summary>
        public password: string,
    ){}
}