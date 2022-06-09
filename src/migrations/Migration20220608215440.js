'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const Migration = require('@mikro-orm/migrations').Migration;

class Migration20220608215440 extends Migration {
  async up() {
    this.addSql(
      'create table if not exists `movies` (`id` varchar(255) not null, `createdAt` datetime(3) not null, `updatedAt` datetime(3) not null, `deletedAt` datetime(3) null, `createdBy` int(11) not null, `title` varchar(255) not null, `released` date not null, `genre` varchar(255) not null, `director` varchar(255) not null) default character set utf8mb4 engine = InnoDB;',
    );
    this.addSql('alter table `movies` add primary key `movies_pkey`(`id`);');
  }
}
exports.Migration20220608215440 = Migration20220608215440;
