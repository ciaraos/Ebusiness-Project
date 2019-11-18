package Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {

    @JsonProperty
    boolean valid;
}
