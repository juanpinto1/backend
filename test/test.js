const request = require('supertest');
const server = require("../../index");

describe('Testing Eventos Musicales', () => {

it('Debería obtener todos los Eventos', async () => {
    const response = await request(server).get('/api/profile/events/get-all');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('msg', 'Todos los libros 📚');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
    
    // Verificar que hay libros en la respuesta antes de acceder a ellos
    if (response.body.data.length > 0) {
      const event = response.body.data[0];
      expect(event).toHaveProperty('title_id');
      expect(event).toHaveProperty('title');
      expect(event).toHaveProperty('description');
      expect(event).toHaveProperty('date');
      expect(event).toHaveProperty('location');
      expect(event).toHaveProperty('ticket_price');
      expect(event).toHaveProperty('tickets_avaliable');
    }
  });


  it('Debería obtener los datos del usuario', async () => {
    const response = await request(server).get('/api/profile/perfil');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('msg', 'Todos los usuarios');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
    if (response.body.data.length > 0) {
      const user = response.body.data[0];
      expect(user).toHaveProperty('user_id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('password');
      expect(user).toHaveProperty('profile_picture');
      expect(user).toHaveProperty('usermane');
    }
  });



  it('Debería devolver un error al crear un usuario con un email existente', async () => {
    const response = await request(server)
      .post('/api/profile/create')
      .send({
        nombre: 'Patana',
        email: 'patana@correo.cl',
        password: '1234'
      });
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('msg', 'El correo ya se encuentra registrado');
  });


  it('Debería actualizar los datos de un Evento', async () => {
    const response = await request(server)
      .put('/api/profile/update')
      .send({
        ticket_price: 18000,
        tickets_avaliable: 20
      });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('msg', 'Evento actualizado correctamente');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Object);
    expect(response.body.data).toHaveProperty('title_id');
    expect(response.body.data).toHaveProperty('ticket_price', 18000);
    expect(response.body.data).toHaveProperty('tickets_avaliable', 20);
  });

});