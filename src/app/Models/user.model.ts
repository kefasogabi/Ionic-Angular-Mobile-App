
export interface KeyValuePair {
    id: string;
    name: string;
  }
  
  export class Activate{
    userId:string;
  }

  export class SendVerificationCode{
    userId:string;
    telephone: string;
    email: string;
  }

  export class LocalData{
    email: string;
    userId: string;
    telephone: string;
    countryId: string;
    fullname: string;
    orgService:boolean;
    ryderService:boolean;
    clientService:boolean;
    vendorService:boolean;
  }

  export class ImageUrl{
    userId: string;
    imageBase64String: string
  }

  export class signup{
    email: string;
    password: string;
    countryId: string;
    telephone: string;
    confirmPassword: string;
  }

  export class Login{
    password: string;
    telephone: string;
  }
  
  export class Client{
    userId: string;
    surname: string;
    firstname: string;
    othernames: string;
    gender: string;
  }

  export class Vendor{
    userId: string;
    surname: string;
    firstname: string;
    othernames: string;
    gender: string;
  }

  export class Rider{
    userId: string;
    surname: string;
    firstname: string;
    othernames: string;
    gender: string;
    gpsAddress: string;
    gpsLongitude: number;
    gpsLatitude: number;
    gpsAddressImage:string;
    vehicleId: string;
    vehicleType: string;
    vehicleMake: string;
    vehicleModel: string;
  }

  export class Org{
    userId: string;
    orgName: string;
    regNumber: string;
    gpsAddress: string;
    gpsLongitude: number;
    gpsLatitude: number;
    gpsAddressImage:string;
  }

  export class Booking{
    vendorId: string;
    typeOfContent: string;
    briefDescription: string;
    packageImage: string
    

    
    pickupDateTime: string;
    pickupAddress: string;
    pickupLongitude:number;
    pickupLatitude:number;
    pickupAddressImage:string;

    clientId: string;
    contactTelephone: string;
    dropoffDateTime:string;
    dropoffAddress:string;
    dropoffLatitude:number;
    dropoffLongitude:number;
    dropoffAddressImage:string;
    
    typeOfRide:string;
    price:number;
  
    
  }

  export interface Coordinates {
    lat: number;
    lng: number;
  }

  export interface PlaceLocation extends Coordinates {
    address: string;
    staticMapImageUrl: string;
  }

  export interface BookingInfo{
    rideId: string;
    pickupType: string;
    pickupDateTime: string;
    dropoffDateTime: string;
    rideStatus: string;
    paymentType: string;
    paymentStatus: string;
    transDate: string;
    pickupId: number;
    vendorId: string;
    vendorName: string;
    dropoffId: number;
    clientId: string;
    contactTelephone: string;
    clientName: string;
    packageId: number;
    briefDescription: string;
    typeOfContent: string;
    image: string;
    routeId: number;
    riderId: string;
    riderPickupDate: string;
    riderDropoffDate: string;
    rideOrder: number;
    riderName: string;
    telephone: string;
    riderImage: string;
    orgId: string;
    pickupLongitude: number;
    pickupLatitude: number;
    pickupAddress: string;
    dropoffLongitude: number;
    dropoffLatitude: number;
    dropoffAddress: string;
    pickupGender: string;
    dropoffGender: string;
    price:number;
  }

  export interface BankAccount{
    userId:string;
    accountName:string;
    accountNumber:string;
    bankName:string;
  }

  export interface Card{
    userId:string;
    cardNumber:string;
    cardType:string;
    cardName:string;
    expiryMonth:number;
    expiryYear:number;
    securityNumber:string;
  }

  export interface EditUser{
    userId:string;
    surname:string;
    firstname:string;
    othernames:string;
    gender:string;
  }

  export interface Estimate{
    pickupLongitude: number;
    pickupLatitude: number;
    dropoffLongitude: number;
    dropoffLatitude: number;
    countryId: string;
  }

  export interface EstimateDetail{
    currency: string;
    pickupType: string;
    price: number;
  }

  export interface PostDeposit{
      userId: string;
      amount: number;
      charges: number;
      remarks: string;
      referenceNo: string;
  }

  export interface PostTransaction{
    rideId: string;
  }

  export interface CreateWallet{
    userId: string;
    countryId: string;
  }

  export interface Guarantor{
    userId: string;
    fullname: string;
    telephone: number;
    occupationId: string;
    contactAddress: string;
    cityOrTown: string;
    stateOrRegion: string;
    relationshipId: string;
  }

  export class AuthData {
    constructor(
      public userId: string,
      public email: string,
      private _token: string,
      private tokenExpirationDate: Date,
      public telephoneVerified: boolean,
      public emailVerified: boolean,
      public orgService: boolean,
      public ryderService: boolean,
      public clientService: boolean,
      public vendorService: boolean
    ) {}
  
    get token() {
      if (!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
        return null;
      }
      return this._token;
    }
  
    get tokenDuration() {
      if (!this.token) {
        return 0;
      }
      return this.tokenExpirationDate.getTime() - new Date().getTime();
    }
  }