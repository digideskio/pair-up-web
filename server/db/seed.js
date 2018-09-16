const conn = require('./conn');
const { User, Organization, Description, UserOrganization, Form, OrganizationRequest, UserRequest } = require('./index').models;

const seed = () => {
  return Promise.all([
    User.create({
      firstName: 'Master',
      lastName: 'Master',
      email: 'master@test.com',
      password: 'master',
      userStatus: 'master'
    }),
    User.create({
      firstName: 'Admin',
      lastName: 'Admin',
      email: 'admin@test.com',
      password: 'admin',
      userStatus: 'admin'
    }),
    User.create({
      firstName: 'Jeremy',
      lastName: 'Grubard',
      email: 'jgrubard@gmail.com',
      password: 'jeremy',
      userStatus: 'user'
    }),
    User.create({
      firstName: 'Anna',
      lastName: 'Zhang',
      email: 'annazhang@gmail.com',
      password: 'anna',
      userStatus: 'user'
    }),
    User.create({
      firstName: 'Gabriel',
      lastName: 'Rumbaut',
      email: 'gabrielrumbaut@gmail.com',
      password: 'gabriel',
      userStatus: 'user'
    }),
    User.create({
      firstName: 'A',
      lastName: 'L',
      email: 'al@gmail.com',
      password: 'al',
      userStatus: 'user'
    }),
    Organization.create({
      name: 'Cliffs LIC',
      organization_type: 'Climbing Gym',
      address: '11 44th Drive',
      city: 'Queens',
      state: 'New York',
      zip: '11101',
      contact_name: 'Mary',
      contact_phone: '718-729-7625',
      backgroundColor: "#02a4ff",
      textColor: '#fff',
      latitude: 40.705076,
      longitude: -74.009160,
      image: 'https://fortunedotcom.files.wordpress.com/2015/09/bri10_a.jpg',
      avatar: 'https://pbs.twimg.com/profile_images/3703706045/be4aed2621811421703e5467080cd24e_400x400.jpeg'
    }),
    Organization.create({
      name: 'REACTO',
      organization_type: 'Education',
      address: '575 Degraw St',
      city: 'Brooklyn',
      state: 'New York',
      zip: '11217',
      contact_name: 'Lucy',
      contact_phone: '347-834-9066',
      backgroundColor: '#33691e',
      textColor: '#fff',
      latitude: 40.704418,
      longitude: -74.017902,
      image: 'https://qph.fs.quoracdn.net/main-qimg-1ee9d253447dd94fa82cb7ef82dff787-c',
      avatar: 'https://react-etc.net/files/2017-12/react-hexagon.png'
    }),
    Organization.create({
      name: 'Fullstack Academy',
      organization_type: 'Education',
      address: '5 Hanover Square',
      city: 'New York',
      state: 'New York',
      zip: '10004',
      contact_name: 'David',
      contact_phone: '123-456-7890',
      latitude: 40.705726,
      longitude: -74.017750,
      image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F27040978%2F151501596199%2F1%2Foriginal.jpg?h=230&w=460&auto=compress&rect=0%2C13%2C1200%2C600&s=2ee8ab448a5e62dddb9229e2b627f22b',
      avatar: 'https://pbs.twimg.com/profile_images/694191024416112642/VtJUhbKk_400x400.png'
    }),
    Organization.create({
      name: 'Title Boxing Club',
      organization_type: 'Boxing Gym',
      address: '383 Lafayette Street',
      city: 'New York',
      state: 'New York',
      zip: '10003',
      contact_name: 'Andrew D. Hamilton',
      contact_phone: '123-456-7890',
      latitude: 40.704362,
      longitude: -74.010046,
      image: 'http://vp.cdn.cityvoterinc.com/g/00-00-06-18-27-97-6182797_2942362.jpg',
      avatar: 'https://www.titleboxing.com/media/catalog/product/cache/1/image/800x/9df78eab33525d08d6e5fb8d27136e95/t/b/tbcmagnet3_1.jpg',
    }),
    Organization.create({
      name: 'Acme',
      organization_type: 'Bar',
      address: '373 Park Ave S',
      city: 'New York',
      state: 'New York',
      zip: '10016',
      contact_name: 'Mat',
      contact_phone: '212-294-1000',
      latitude: 40.706877,
      longitude: -74.011265,
      image: 'https://ksr-ugc.imgix.net/assets/016/971/196/8f871c6128dce37f044cadf6a6858f5d_original.jpg?crop=faces&w=1552&h=873&fit=crop&v=1499951444&auto=format&q=92&s=6b8ad9ccaa766e75d5bef7ebfd59c9de',
      avatar: 'https://vignette.wikia.nocookie.net/villains/images/5/56/Comp_2.jpg/revision/latest?cb=20140318215950',
    })
  ])
  .then(([ master, admin, jeremy, anna, gabriel, alexander, cliffs, reacto, fullstack, tiger, acme]) => {
    return Promise.all([
      Form.create({
        name: 'Bouldering Skill Level',
        organizationId: cliffs.id
      }),
      Form.create({
        name: 'Top-Rope Skill Level',
        organizationId: cliffs.id
      }),
      Form.create({
        name: 'Years Experience',
        organizationId: fullstack.id
      }),
      Form.create({
        name: 'Developer Level',
        organizationId: fullstack.id
      }),
      Description.create({
        description: 'I am a junior',
        userId: anna.id,
        organizationId: fullstack.id,
      }),
      Description.create({
        description: 'I am a senior',
        userId: alexander.id,
        organizationId: fullstack.id,
      }),
      UserOrganization.create({
        userId: admin.id,
        organizationId: cliffs.id
      }),
      UserOrganization.create({
        userId: jeremy.id,
        organizationId: reacto.id
      }),
      OrganizationRequest.create({
        userId: jeremy.id,
        organizationId: reacto.id,
        status: 'accepted'
      }),
      UserOrganization.create({
        userId: jeremy.id,
        organizationId: fullstack.id
      }),
      OrganizationRequest.create({
        userId: jeremy.id,
        organizationId: fullstack.id,
        status: 'accepted'
      }),
      UserOrganization.create({
        userId: anna.id,
        organizationId: fullstack.id
      }),
      UserOrganization.create({
        userId: anna.id,
        organizationId: tiger.id
      }),
      UserOrganization.create({
        userId: gabriel.id,
        organizationId: fullstack.id
      }),
      UserOrganization.create({
        userId: alexander.id,
        organizationId: fullstack.id
      }),
      UserOrganization.create({
        userId: alexander.id,
        organizationId: acme.id
      }),
      admin.setOrganization(cliffs),
    ])
  })
}

conn.sync({ force: true })
  .then(() => {
    console.log('seeding...')
    return seed();
  })
  .then(() => console.log('...database seeded...'))
  .then(() => {
    console.log('...connection closed')
    conn.close()
  })
  .catch(err => {
    console.log('uh-oh, there was an error seeding!')
    console.log(err)
  })
