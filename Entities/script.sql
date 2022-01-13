CREATE TABLE grom_bride_info (
    id serial primary key,
    nid text  NOT NULL,
    name text  NOT NULL,
    dob date NOT NULL,
    mobile_no text NOT NULL,
    email text,
    relegion text NOT NULL,
    father_name text,
    father_nid text,
	   mother_name text,
    mother_nid text,
    
    gb_id INT  NOT NULL,
     created_by TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_by TEXT NULL,
    updated_at TIMESTAMPTZ NULL
)

CREATE TABLE address (
    id serial primary key,
    address_type text NOT NULL,
    user_type text  NULL,
    district_id INT  NULL,
   upazila_id INT  NULL,
    union_id INT  NULL,
    post_code INT NOT NULL,
    details_address text NOT NULL,
    create_by text,
    create_date TIMESTAMPTZ NULL
);



CREATE TABLE marriage_info (
    id serial primary key,
    gb_id int not null, 
    district_id int not null,
    upazila_id int not null,
    union_id int not null ,
    post_code int not null,
    detail_address text not null,
    fixed_on TIMESTAMPTZ not null, 
    marriage_date TIMESTAMPTZ not null, 
    reg_date TIMESTAMPTZ not null,
    denmohor int not null,
    paid_denmohor int not null, 
    muazzol text not null, 
    muazzil text not null, 
    create_by text not null, 
    create_date TIMESTAMPTZ not null)
