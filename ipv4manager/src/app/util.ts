export class Util {

    public static isValidIPFormat(ipAddress: string): boolean {
        let isValid: boolean = true;
        let octets: string[] = ipAddress.split('.');
        if (octets.length != 4) isValid = false;

        octets.forEach((octet) => {
            let decValue = -1;
            try {
                decValue = parseInt(octet);
            } catch (error) {
                isValid = false;
            }
            if(decValue < 0 || decValue > 255) isValid = false;
        });
        
        return isValid;
    }
}
