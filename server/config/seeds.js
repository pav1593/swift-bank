const db = require('./connection');
const mongoose = require('mongoose');
const { User, Product, Category, Account,Transaction,TransType } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  // const categories = await Category.insertMany([
  //   { name: 'Personal Deposit Account' },
  //   { name: 'Business Deposit Account' },
  //   { name: 'Joint Deposit Account' },
  //   { name: 'Fixed Rate Mortgage' },
  //   { name: 'Floating Rate Mortgage' },
  //   { name: 'Personal Investment Account' },
  //   { name: 'Personal Line of Credit' },
  //   { name: 'Fixed Rate Loan' }
  // ]);

  // console.log('Product categories seeded');

  await TransType.deleteMany();

  const transTypes = await TransType.insertMany([
    { name: 'Interest Charge' },
    { name: 'Service Fee' },
    { name: 'Interest Earned' },
    { name: 'Loan reversal' },
    { name: 'Deposit reversal' },
    { name: 'Transfer reversal' },
    { name: 'Deposit' },
    { name: 'Withdrawal' },
    { name: 'Electronic Transfer In' },
    { name: 'Electronic Transfer Out' },
    { name: 'Borrowing' },
    { name: 'Repayment' },
  ]);

  console.log('Transaction types seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Personal Deposit',
      description:
        'Personal deposit account',
    },
    {
      name: 'Fixed Rate Loan',
      description:
        'Persoanl loan',
      //type: categories[7]._id,
      unitPrice: 10000,
      unitQty:1,
      termDays: 730
    },
    {
      name: 'Personal Investment Account',
      description:
        'Personal Investment Account',
      //type: categories[5]._id
    },
   
  ]);

  console.log('Products seeded');


  await Transaction.deleteMany();

  const transactions = await Transaction.insertMany([
    {
      acctId: 1,
      amount: 1000,
      type: transTypes[6]._id,
    },
    {
      acctId: 2,
      amount: 2.99,
      type: transTypes[1]._id,
    },
   
  ]);
  console.log('transactions:',mongoose.Types.ObjectId(transactions[0]._id));

  console.log('Transactions seeded');

  await Account.deleteMany()

  const accounts = await Account.insertMany([
    {
      accountNumber: 1,
      product: products[0]._id,
      transactions: [transactions[0],transactions[1]]
    },
    {
      accountNumber: 2,
      product: products[1]._id,
     transactions: [transactions[0]]
    }
  ])

  console.log('Accounts seeded')

  await User.deleteMany();

  await User.create({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@abc.com',
    password: 'password',
    admin: true,
    accounts: [ accounts[0], accounts[1]]
  });

  await User.create({
    firstName: 'David',
    lastName: 'Smith',
    email: 'david@swiftbank.com',
    password: 'password',
    admin: true
  });

  console.log('Users seeded');


  process.exit();
});
