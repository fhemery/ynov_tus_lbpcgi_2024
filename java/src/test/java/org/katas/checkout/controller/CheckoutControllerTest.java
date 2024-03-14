package org.katas.checkout.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.katas.checkout.controller.dtos.CheckoutRequestDto;
import org.katas.checkout.controller.dtos.CreditCardDto;
import org.katas.checkout.controller.dtos.DeliveryDto;
import org.katas.checkout.controller.exceptions.BadRequestException;
import org.katas.checkout.services.CheckoutService;
import org.katas.checkout.services.model.CheckoutRequest;
import org.katas.checkout.services.model.CheckoutResponse;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.STRICT_STUBS )
public class CheckoutControllerTest {

    CheckoutController controller;
    @Mock
    private CheckoutService checkoutService;

    @BeforeEach
    public void setUp() {
        controller = new CheckoutController(checkoutService);
    }

    @Test
    public void should_throwExceptionWhenNoInfoProvided() {
        assertThrows(BadRequestException.class, () -> controller.checkout(null));
    }

    @Test
    public void should_throwExceptionWhenCartIdIsNotProvided() {
        var dto = new CheckoutRequestDto(null, new CreditCardDto("1234", "12/23", "123"), new DeliveryDto("Name", "Street", "City"));

        assertThrows(BadRequestException.class, () -> controller.checkout(dto));
    }

    // Many more tests to validate

    @Test
    public void should_replyToCustomerWhenAllDataIsValid() {
        // ARRANGE
        // Mock checkoutResponse
        CheckoutResponse checkoutResponse = new CheckoutResponse("orderId", "orderNumber", 100);
        Mockito.when(checkoutService.checkout(Mockito.any())).thenReturn(checkoutResponse);

        // Prepare data to be sent to controller
        var dto = new CheckoutRequestDto("cartId", new CreditCardDto("1234", "12/23", "123"), new DeliveryDto("Name", "Street", "City"));

        // ACT
        var response = controller.checkout(dto);

        // ASSERT
        assertNotNull(response);
        assertEquals(checkoutResponse.orderId(), response.orderId());

        // Get first paramater of first mockito call
        var request = (CheckoutRequest) Mockito.mockingDetails(checkoutService).getInvocations().stream().findFirst().get().getArguments()[0];
        assertEquals(dto.cartId(), request.cartId());
    }

    // Do the same with other fields
}
