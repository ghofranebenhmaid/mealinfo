const express = require('express');
const router = express.Router();
const pool = require('./../database');
const bodyParser = require('body-parser');

// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());

// * Get all reservations
router.get('/', (req, res) => {
   pool.query('select * from reservation;', (err, results, fields) => {
      if (err) {
         console.error(err);
      } else {
         res.send(results);
      }
   });
});
// * Post new reservation
router.post('/', (req, res) => {
   const reservation = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      meal_id: req.body.meal_id
   };
   pool.query(
      'insert into reservation set ?;',
      reservation,
      (err, results, fields) => {
         if (err) {
            console.error(err);
         } else {
            res.send(results);
         }
      }
   );
});

// * Get reservation by id
router.get('/:id', (req, res) => {
   const id = req.params.id;
   pool.query(
      'select * from reservation where id = ?;',
      id,
      (err, results, fields) => {
         if (err) {
            console.error(err);
         } else if (results.length < 1) {
            res.send('There is no such an id');
         } else {
            res.send(results);
         }
      }
   );
});

// * Update reservation by id
router.put('/:id', (req, res) => {
   const id = req.params.id;
   pool.query(
      'update reservation set name = ?, email = ?, phone= ? where id = ?;',
      [req.body.name, req.body.email, req.body.phone, id],
      (err, results, fields) => {
         if (err) {
            console.error(err);
         } else {
            res.send('Reservation has been updated.');
            console.log(results, fields);
         }
      }
   );
});

router.delete('/:id', (req, res) => {
   const id = req.params.id;
   pool.query(
      'delete from reservation where id = ?;',
      id,
      (err, results, fields) => {
         if (err) {
            console.error(err);
         } else if (results.length < 1) {
            res.send('There is no such an id.');
         } else {
            console.log(fields);
            res.send('reservation has been deleted successfully.');
         }
      }
   );
});

module.exports = router;
