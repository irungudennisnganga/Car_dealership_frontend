import React, { useState, useRef } from 'react';
import imageplaceholder from '../images/imageplaceholder.jpg';
import { useDropzone } from 'react-dropzone'; 
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const AddInventory = () => {
    const [make, setMake] = useState('');
    const [price, setPrice] = useState('');
    const [color, setColor] = useState('');
    const [transmission, setTransmission] = useState('');
    const [drive_type, setDrivetype] = useState('');
    const [availability, setAvailability] = useState('');
    const [features, setFeatures] = useState('');
    const [stock_number, setStocknumber] = useState('');
    const [country_of_origin, setCountryoforigin] = useState('');
    const [import_document, setImportdocument] = useState(null);
    const [model, setModel] = useState('');
    const [currency, setCurrency] = useState('');
    const [mileage, setMileage] = useState('');
    const [fuel_type, setFueltype] = useState('');
    const [trim_level, setTrimlevel] = useState('');
    const [cylinder, setCylinder] = useState('');
    const [image, setImage] = useState(null); 
    const inputRef = useRef(null);
    const [purchase_cost, setPurchasecost] = useState('');
    const [import_date, setImportdate] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');
    const [body_type, setBodytype] = useState('');
    const [engine_size, setEnginesize] = useState('');
    const [condition, setCondition] = useState('');
    const [doors, setDoors] = useState('');
    const [gallery_images, setGalleryImages] = useState([]);
    const { handleSubmit } = useForm();

    const handleImageClick = () => {
        inputRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    const handleGallery = (acceptedFiles) => {
        setGalleryImages([...gallery_images, ...acceptedFiles]);
    };

    const { getRootProps: getGalleryRootProps, getInputProps: getGalleryInputProps } = useDropzone({ onDrop: handleGallery });

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('make', make);
        formData.append('price', price);
        formData.append('color', color);
        formData.append('transmission', transmission);
        formData.append('drive_type', drive_type);
        formData.append('availability', availability);
        formData.append('features', features);
        formData.append('stock_number', stock_number);
        formData.append('country_of_origin', country_of_origin);
        formData.append('import_document', import_document);
        formData.append('model', model);
        formData.append('currency', currency);
        formData.append('mileage', mileage);
        formData.append('fuel_type', fuel_type);
        formData.append('trim_level', trim_level);
        formData.append('cylinder', cylinder);
        formData.append('image', image);
        formData.append('purchase_cost', purchase_cost);
        formData.append('import_date', import_date);
        formData.append('year', year);
        formData.append('vin', vin);
        formData.append('body_type', body_type);
        formData.append('engine_size', engine_size);
        formData.append('condition', condition);
        formData.append('doors', doors);
        gallery_images.forEach((file, index) => {
            formData.append(`gallery_images[${index}]`, file);
        });
console.log(gallery_images)
        try {
            const response = await fetch('/inventory', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                  },
                body: formData,
            });

            if (response.ok) {
                Swal.fire('Success', 'Inventory added successfully', 'success');
            } else {
                Swal.fire('Error', 'Failed to add inventory', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire('Error', 'Failed to add inventory', 'error');
        }
    };

    return(
        
       
             <div className="flex flex-wrap bg-slate200 rounded-lg border shadow-md justify-center mt-8 m-auto relative w-[850px] h-[1010px]">
           
                <form className="flex flex-wrap w-full" onSubmit={handleSubmit(onSubmit)}> 
                    <div className="w-full md:w-1/3 px-2 mb-2 p-8 bg-white rounded-lg shadow-md grid-cols-10 gap-4">
                        
                        <div className="mb-4 mt-8">

                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                Make
                            </label>
                            <select
                                className="border rounded-md w-full py-2 px-3"
                                id='make'
                                value={make}
                                onChange={(e) => setMake(e.target.value)}
                                required
                            >
                                <option value=''>Choose the make</option>
                                <option value='Toyota'>Toyota</option>
                                <option value='Honda'>Honda</option>
                                <option value='Ford'>Ford</option>
                                
                            </select>
                        </div>

                        
                        <div className="mb-4 mt-8">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                    Price
                                </label>
                                <input
                                    className="border rounded-md w-full py-2 px-3"
                                    type='number'
                                    id='price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder='Enter the price'
                                    required
                                />
                                
                        </div>
                        <div className="mb-4 mt-8">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
                                        Color
                                    </label>
                                    <input
                                        className="border rounded-md w-full py-2 px-3"
                                        type='text'
                                        id='color'
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        placeholder='Enter the color'
                                        required
                                    />

                        </div>
                        <div className="mb-4 mt-8">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tranmission">
                                        Transmission
                                    </label>
                                    <input
                                        className="border rounded-md w-full py-2 px-3"
                                        type='text'
                                        id='transmission'
                                        value={transmission}
                                        onChange={(e) => setTransmission(e.target.value)}
                                        placeholder='Enter the transmission'
                                        required
                                    />

                        </div>
                        <div className="mb-4 mt-8">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                        Drive Type
                                    </label>
                                    <input
                                        className="border rounded-md w-full py-2 px-3"
                                        type='text'
                                        id='drive_type'
                                        value={drive_type}
                                        onChange={(e) => setDrivetype(e.target.value)}
                                        placeholder='Set the drive type'
                                        required
                                    />

                        </div>
                        <div className="mb-4 mt-8">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                        Availability
                                    </label>
                                    <input
                                        className="border rounded-md w-full py-2 px-3"
                                        type='text'
                                        id='availability'
                                        value={availability}
                                        onChange={(e) => setAvailability(e.target.value)}
                                        placeholder='Set the availability'
                                        required
                                    />

                        </div>
                        <div clasName="mb-4 mt-8">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="features">
                                        Features
                            </label>
                            <input
                                className="border rounded-md w-full py-2 px-3"
                                type='text'
                                id='features'
                                value={features}
                                onChange={(e) => setFeatures(e.target.value)}
                                placeholder='Enter the Features'
                                required
                                        
                            />

                        </div>
                      
                        <div className="mb-4 mt-8">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                                    Country Of Origin
                                </label>
                                <input
                                    className="border rounded-md w-full py-2 px-3"
                                    type='text'
                                    id="country_of_origin"
                                    value={country_of_origin}
                                    onChange={(e) => setCountryoforigin(e.target.value)}
                                    placeholder="Select Country"
                                    required
                                />
                        </div>
                        <div className="mb-4 mt-8">
                                <label
                                    htmlFor="formFile"
                                    className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                                >
                                    Import Documents
                                </label>
                                <input
                                    className="rounded-md w-full py-2 px-3 relative m-0 block min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                                    type="file"
                                    id="import_document"
                                    value={import_document}
                                    onChange={(e) => setImportdocument(e.target.value)}
                                />
                        </div>
                        

                    </div>
                    <div className="w-full md:w-1/3 px-2 mb-2 p-8 bg-white rounded-lg shadow-md">
                        <div className="mb-4 mt-8">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="models">
                                    Models
                                </label>
                                <input
                                    className="border rounded-md w-full py-2 px-3"
                                    type='text'
                                    id='model'
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                    placeholder='Set the Model'
                                    required
                                />
                                                    

                        </div>
                        <div className="mb-4 mt-8">

                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currency">
                                Currency
                            </label>
                            <select
                                className="border rounded-md w-full py-2 px-3"
                                id='currency'
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                required
                            >
                                <option value=''>Choose the Currency</option>
                                <option value='Ksh'>Ksh</option>
                                <option value='Dollar'>Dollar</option>

                                
                            </select>
                        </div>
                        <div className="mb-4 mt-8">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mileage">
                                Mileage
                            </label>
                            <input
                                className="border rounded-md w-full py-2 px-3"
                                type='text'
                                id='mileage'
                                value={mileage}
                                onChange={(e) => setMileage(e.target.value)}
                                placeholder='Enter the Mileage'
                                required
                                    
                            />                          

                        </div>
                        <div className="mb-4 mt-8">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fuel_type">
                                Fuel Type
                            </label>
                            <input
                                className="border rounded-md w-full py-2 px-3"
                                type='text'
                                id='fuel_type'
                                value={fuel_type}
                                onChange={(e) => setFueltype(e.target.value)}
                                placeholder='Enter the fuel_type'
                                required
                                    
                            />

                        </div>
                        <div className="mb-4 mt-8">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="trim_level">
                                Trim Level
                            </label>
                            <input
                                className="border rounded-md w-full py-2 px-3"
                                type='text'
                                id='trim_level'
                                value={trim_level}
                                onChange={(e) => setTrimlevel(e.target.value)}
                                placeholder='Enter the trim_level'
                                required
                                    
                            />
                        </div>
                        <div className="mb-4 mt-8">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cylinder">
                                Cylinder
                            </label>
                            <input
                                className="border rounded-md w-full py-2 px-3"
                                type='text'
                                id='cylinder'
                                value={cylinder}
                                onChange={(e) => setCylinder(e.target.value)}
                                placeholder='Enter the Cylinder'
                                required
                                    
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="purchase_cost">
                                Purchase Cost
                            </label>
                            <input
                                className="border rounded-md w-full py-2 px-3"
                                type='number'
                                id='purchase_cost'
                                value={purchase_cost}
                                onChange={(e) => setPurchasecost(e.target.value)}
                                placeholder='Enter the purchase_cost'
                                required
                            />
                                    

                        </div>
                        <div className="mb-4 mt-8">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="import_date">
                                Import Date
                            </label>
                            <input
                                className="border rounded-md w-full py-2 px-3"
                                type='date'
                                id='import_date'
                                value={import_date}
                                onChange={e => setImportdate(e.target.value)}
                                placeholder='Enter the import date'
                                required       
                            />
                        </div>
                        <div className="mb-4 mt-8">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
                                Car Image
                            </label>
                            
                            <div onClick={handleImageClick} className='h-[40px] w-[60px] rounded-[2px] cursor-pointer relative'>
                                <div>
                                    {image ? (
                                        <img className='w-full h-full object-cover' src={URL.createObjectURL(image)} alt="/"/>
                                    ) : (
                                        <img className='w-full h-full object-cover' src={imageplaceholder} alt="/" />
                                    )}
                                </div>
                                <input type="file" ref={inputRef} onChange={handleImageChange} className='hidden'/>
                            </div>
                        </div>

                    </div>
                    <div className="w-full md:w-1/3 px-2 mb-2 p-8 bg-white rounded-lg shadow-md">
                        <div className="mb-4 mt-8">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
                                Year
                            </label>
                            <input
                                className="border rounded-md w-full py-2 px-3"
                                type='number'
                                id="year"
                                value={year}
                                onChange={e => setYear(e.target.value)}
                                placeholder='Enter the Year'
                                required
                                
                            >
                                
                            </input>
                        </div>
                        <div className="mb-4 mt-8">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vin">
                                VIN
                            </label>
                            <input
                                className="border rounded-md w-full py-2 px-3"
                                type='number'
                                id="vin"
                                value={vin}
                                onChange={e => setVin(e.target.value)}
                                placeholder='Enter the VIN'
                                required
                                
                            >
                                
                            </input>
                        </div>
                        <div className="mb-4 mt-8">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body_type">
                                Body Type
                            </label>
                            <input
                                className="border rounded-md w-full py-2 px-3"
                                type='text'
                                id="body_type"
                                value={body_type}
                                onChange={e => setBodytype(e.target.value)}
                                placeholder='Enter the body type'
                                required
                                
                            >
                                
                            </input>
                        </div>
                        <div className="mb-4 mt-8">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="engine_size">
                                Engine Size
                            </label>
                            <input
                                className="border rounded-md w-full py-2 px-3"
                                type='number'
                                id="engine_size"
                                value={engine_size}
                                onChange={e => setEnginesize(e.target.value)}
                                placeholder='Enter the Engine Size'
                                required
                                
                            >
                                
                            </input>
                        </div>
                        <div clasName="mb-4 mt-8">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock_number">
                                        Stock Number
                            </label>
                            <input
                                className="border rounded-md w-full py-2 px-3"
                                type='number'
                                id='stock_number'
                                value={stock_number}
                                onChange={(e) => setStocknumber(e.target.value)}
                                placeholder='Enter the stock_number'
                                required
                                        
                            />

                        </div>
                        
                        <div className="mb-4 mt-8">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="condition">
                                Condition
                            </label>
                            <input
                                className="border rounded-md w-full py-2 px-3"
                                type='text'
                                id="condition"
                                value={condition}
                                onChange={e => setCondition(e.target.value)}
                                placeholder='Enter the Condition'
                                required
                                
                            >
                                
                            </input>
                        </div>
                        <div className="mb-4 mt-8">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doors">
                                Doors
                            </label>
                            <input
                                className="border rounded-md w-full py-2 px-3"
                                type='number'
                                id="doors"
                                value={doors}
                                onChange={e => setDoors(e.target.value)}
                                placeholder='Set the Doors'
                                required
                                
                            >
                                
                            </input>
                        </div>
                        <div className="mb-4 mt-8">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gallery_image">
                                Gallery
                            </label>
                            <div {...getGalleryRootProps({ className: 'border rounded-md w-full py-2 px-3 dropzone' })}>
                                <input {...getGalleryInputProps()} />
                                <p>click to select files</p>
                            </div>
                            <div>
                                {gallery_images.map(file => (
                                     <div key={file.name}>
                                    <img style={{ width: '100px' }} src={URL.createObjectURL(file)} alt={file.name} />
                                    <p>{file.name} - {file.size} bytes</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="bg-cyan300 hover:shadow hover:bg-cyan40 text-white font-bold py-2 px-4 mt-4 border rounded-md w-full ">
                            Submit
                        </button>


                    </div>
                    
                    

                </form>
            </div>
                
                 
        
    )

}

export default AddInventory;