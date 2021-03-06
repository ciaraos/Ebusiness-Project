package Service;

import Client.OtpClient;
import Model.SendOtpRequest;
import Model.SendOtpResponse;
import Model.VerifyOtpRequest;
import Model.VerifyOtpResponse;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class OtpService {

    OtpClient otpClient;

    @Inject
    public OtpService(OtpClient otpClient){
        this.otpClient = otpClient;
    }

    public SendOtpResponse sendOtp(SendOtpRequest sendOtpRequest){
        return otpClient.sendOtp(sendOtpRequest);
    }

    public VerifyOtpResponse verifyOtp(VerifyOtpRequest verifyOtpRequest){
        return otpClient.verifyOtp(verifyOtpRequest);
    }
}
