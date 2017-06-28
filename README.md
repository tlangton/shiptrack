## Schema
- Company
  - title
- Job
  - title
  - job_number
  - company_id
- Shipment
  - tracking_number
  - ship_date
  - ship_to_address
  - job_id
  - status


## API Todos
- √ Create Shipment model
- Import Data
  - Google Sequelize docs
  - Remember how to create instances of models and save them
  - or use Postico
- Create UPS API module
- Create Module for Queries
  - allCompanyNames()
  - shipmentsForCompany(companyId)
- Build routes
  - '/companies'
  - '/companies/:id/shipments'

## React Todos
- React

### Optional Todos
- Add foreign key constraints for relationships via migrations.
