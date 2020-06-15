export class ActiveAnswer{
    constructor(
        public order_name: string,
        public order_num: string, // подзаказ
        public order_date: string,
        public order_author: string,
        public order_prog: string,
        public order_status: string,
        public order_place: string,
        public order_post: string, //шт белпочты
        public order_sklad: string,
        public order_id: string,
        public order_username: string, //владелец
        public order_address: string, //адрес
        public order_sm: string,
    ){}
}