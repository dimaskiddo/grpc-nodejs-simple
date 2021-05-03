const uuidv4 = require('uuid/v4')

const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const productProto = protoLoader.loadSync('../protos/product.proto')
const productDefinition = grpc.loadPackageDefinition(productProto).product

const grpcBind = process.env.GRPC_SERVER_BIND || '0.0.0.0'
const grpcPort = process.env.GRPC_SERVER_PORT || 3000

const grpcServer = new grpc.Server()


// -------------------------------------------------
// Products Data Variable
var products = [
  { id: '0b9fa8b8-aa50-4ff7-ba53-008a0b99e21f', name: 'Kursi', price: '200000' },
  { id: '2cdd0349-b5a4-4835-8f66-33501f6e6c66', name: 'Meja',  price: '500000' }
]


// -------------------------------------------------
// GRPC Product Service Handler
grpcServer.addService(productDefinition.ProductService.service, {
  ListProducts: ListProducts,
  InsertProduct: InsertProduct,
  UpdateProduct: UpdateProduct,
  DeleteProduct: DeleteProduct,
  GetProduct: GetProduct,
})


// -------------------------------------------------
// List Products Function Handler
function ListProducts(_, response) {
  response(null, { products: products })
}


// -------------------------------------------------
// Insert Product Function Handler
function InsertProduct(call, response) {
  let product = call.request

  product.id = uuidv4()
  products.push(product)

  response(null, { status: true })
}


// -------------------------------------------------
// Update Product Function Handler
function UpdateProduct(call, response) {
  let product = call.request
  let productIndex = products.findIndex((n) => n.id === product.id)

  if (productIndex != -1){
    products[productIndex] = product
    response(null, { status: true })    
  } else {
    response({
      code: grpc.status.NOT_FOUND,
      details: 'Product Not Found'
    })
  }
}


// -------------------------------------------------
// Delete Product Function Handler
function DeleteProduct(call, response) {
  let productId = call.request.id
  let productIndex = products.findIndex((n) => n.id === productId)

  if (productIndex != -1) {
    products.splice(productIndex, 1)
    response(null, { status: true })
  } else{
    response({
      code: grpc.status.NOT_FOUND,
      details: 'Product Not Found'
    })
  }
}


// -------------------------------------------------
// Get Product Function Handler
function GetProduct(call, response) {
  let productId = call.request.id
  let productIndex = products.findIndex((n) => n.id === productId)

  if (productIndex != -1) {
    response(null, products[productIndex])
  } else {
    response({
      code: grpc.status.NOT_FOUND,
      details: 'Product Not Found'
    })
  }
}


// -------------------------------------------------
// Configure GRPC Server Bind Address and Certificate Credentials
grpcServer.bindAsync(grpcBind+':'+grpcPort, grpc.ServerCredentials.createInsecure(), function(error) {
  if (error !== null)
    console.error(error)

  // Start GRPC Server
  grpcServer.start()
  console.log('GRPC Server Started at '+grpcBind+':'+grpcPort)    
})
