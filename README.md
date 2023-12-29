# CSC309-PetPal

## Project Description
PetPal is the course project for CSC309 (Programming on the Web) at the University of Toronto. It is a pet adoption website where pet seekers can search for pets and apply for adoption. On the other hand, pet shelters can create listings for pets that are up for adoption. The project was split up into three phases. Phase 1 was designing and creating the responsive UI design with HTML, and CSS, as well as CSS Frameworks such as Bootstrap which we used for this project. Phase 2 was implementing the backend using the Django REST Framework, Python Imaging Library (pillow), and Simple JWT for token-based authentication. Phase 3 was implementing the design we created in Phase 1 with React.

## User Stories
 * **Pet Seeker**
     * Users should be able to create accounts with basic information (name, email, password).
     * Users can create and manage their profiles with additional details (contact information, location, preferences).
     * User profiles should include an option to upload a profile picture.
     * Implement secure user authentication and authorization mechanisms.
     * Ensure that user data is protected and privacy is maintained.
 * **Pet Shelter**
     * Shelters should be able to create an account, different from pet seekers, for the purpose of listing their pets for adoption.
     * Each shelter should have a publicly visible page that displays basic information such as contact information, location, mission statement, list of pets, etc.
     * Shelters should be able to create detailed pet listings.
       * Each pet listing should include photos, a name, breed, age, gender, size, and a description (also see Pet Details section)
     * Shelters can update the status of each pet (available, adopted, pending, or withdrawn).
       * Available: users can apply for adoption.
       * Adopted: the pet has been adopted.
       * Pending: The deadline has passed and no more applications are accepted.
       * Withdrawn: the pet is no longer available for adoption.
     * Listings should have a publication date and location information.
   * Shelters should have an easy-to-use interface for managing their listings and application.
 * **Search and Filters**
     * Users can search for pets based on criteria such as location, breed, age, size, color, and gender.
     * Users can sort search results by name, age, and size.
     * Results should be displayed in an organized and easy-to-browse format.
 * **Pet Details**
     * Users can view detailed information about each pet by clicking on a listing.
     * Information should include medical history, behavior, and any special needs or requirements.
 * **Adoption Process**
     * Users should be able to express interest in adopting a pet through an application form.
     * Shelters can review and respond to adoption requests.
       * Users should be able to reply to follow up questions from shelters about their application.
       * Shelters can accept or deny an adoption request.
     * The website should provide guidance on the adoption process, fees, and requirements.
 * **Reviews System**
     * Users can leave reviews and ratings for shelters and their experiences with pet adoption.
     * Other users and shelters can respond to a review.
       * It should be easy to identify response(s) made by the "reviewed" shelter and the original poster.
 * **Notifications**
     * Users should receive notifications for messages, status updates, and new pet listings (based on their preference).
     * Shelters should receive notification for new reviews, new applications, and new messages from applicants.
 * **Shelter Blogs (Extra Feature)**
     * Shelters can post articles on pet care, training, adoption tips, spotlighting animals, etc.
     * Users can view these articles on the shelter profile

## Usage Instructions
 * **Setting Up Backend (starting from root directory)**
   * `cd backend  # go to the backend folder`
   * `virtualenv venv  # create virtual environment`
   * `source venv/bin/activate  # activate virtual environment`
   * `pip3 install -r packages.txt  # install packages`
   * `python3 manage.py makemigrations  # make migrations`
   * `python3 manage.py migrate  # migrate`
   * `python3 manage.py runserver  # run backend server`
 * **Setting Up Frontend (starting from root directory)**
   * `cd frontend  # go to the frontend folder`
   * `npm install  # install npm`
   * `npm start  # run the frontend server`

## Landing Page
<img width="1440" alt="Landing page" src="https://github.com/Kelleou/CSC309-PetPal/assets/97000424/25e04428-dbc2-4314-b4f7-3c315beb1806">

## Shelter Page
<img width="1440" alt="Shelter page" src="https://github.com/Kelleou/CSC309-PetPal/assets/97000424/3160cd6b-338c-4e4d-bbe0-44a6e48bfeaa">

