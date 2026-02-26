import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users
  @Get()
  getUsers(){
    return this.usersService.findAll();
  }

  // Get /users/id
  @Get(':id')
  getUser(@Param('id') id: string){
    console.log(id);
    
    return this.usersService.findOne(Number(id));
  }

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

  @Delete(':id')
  deleteUser(@Param('id') id: string){
    return this.usersService.deleteUser(Number(id));
  }

  @Post()
  createUser(@Body() body: any){
    return this.usersService.createUser(body);
  }
}
