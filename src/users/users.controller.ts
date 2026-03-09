import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users
  @Get()
  getUsers(){
    return this.usersService.findAll();
  }

  // GET /users/id
  @Get(':id')
  getUser(@Param('id') id: string){
    console.log(id);
    
    return this.usersService.findOneById(Number(id));
  }

  // PATCH /users/id
  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() body: any
  ){
    return this.usersService.updateUser(
      Number(id),
      body
    );
  }

  // DELETE /users/id
  @Delete(':id')
  deleteUser(@Param('id') id: string){
    return this.usersService.deleteUser(Number(id));
  }

  // POST /users
  @Post()
  createUser(@Body() body: any){
    console.log(body);
    
    return this.usersService.createUser(body);
  }
}
