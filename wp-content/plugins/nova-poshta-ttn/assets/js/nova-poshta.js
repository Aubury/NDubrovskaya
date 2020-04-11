jQuery(document).ready(function() {



    var sp1 = document.getElementById("billing_nova_poshta_city");
    if (sp1) { //if present billing city id

      var data2 = {
          action: 'novaposhta_updbasesnp',
          c2: jQuery('#billing_nova_poshta_city').val(),
          cod: jQuery('#payment_method_cod').attr('checked')
      };

      jQuery.post(NovaPoshtaHelper.ajaxUrl, data2, function(response) {
          //jQuery('#shipcost').remove();
          //if (!(response.includes('01234')) && (response != 0)) {
          //    jQuery('.order-total').after('<tr id=shipcost class=order-total><th>Розрахунок вартості доставки</th><td><strong><span class="woocommerce-Price-currencySymbol">₴</span>' + response + '<strong></td></tr>')
              console.log(response);
          //} else {
          //    console.log('abortad');
          //}

      });

      function calculatex() { //function to show calculated delivery price
          console.log('calculatex');
          var data = {
              action: 'my_actionfogetnpshippngcost',
              c2: jQuery('#billing_nova_poshta_city').val(),
              cod: jQuery('#payment_method_cod').attr('checked')
          };

          jQuery.post(NovaPoshtaHelper.ajaxUrl, data, function(response) {
              jQuery('#shipcost').remove();
              if (!(response.includes('01234')) && (response != 0)) {
                  jQuery('.order-total').after('<tr id=shipcost class=order-total><th>Розрахунок вартості доставки</th><td><strong><span class="woocommerce-Price-currencySymbol">₴</span>' + response + '<strong><input type="hidden" name=deliveryprice value="'+ response +'"/ ></td></tr>')
                  console.log(response);
              } else {
                  console.log('shipping calculation not available. ');
              }

          });
      }

      function calculated() { //function to remove  calcuated post
          jQuery('#shipcost').remove();
      }

      jQuery('#billing_nova_poshta_city').change(function() { //what do if billing city changed
          calculatex();
      });

      jQuery('body').on('click', '.wc_payment_method', function() { //what to do if payment city changed
          console.log('changed payment method');
          setTimeout(function() {
              calculatex();
          }, 20);
          setTimeout(function() {
              calculatex();
          }, 500);
          setTimeout(function() {
              calculatex();
          }, 4000);
      });

      jQuery('body').on('click', '.shipping_method', function() { //what to do if shipping method changed
          console.log('changed shipping method');
          console.log(jQuery(this).val());
          if (jQuery(this).val() == 'nova_poshta_shipping_method') {
              calculatex();
              setTimeout(function() {
                  calculatex();
              }, 500);
              setTimeout(function() {
                  calculatex();
              }, 4000);
          } else {
              calculated();
          }

      });


        //function select2
        function matchCustom(params, data) { //matcher function
            // If there are no search terms, return all of the data
            if (jQuery.trim(params.term) === '') {
                return data;
            }

            // Do not display the item if there is no 'text' property
            if (typeof data.text === 'undefined') {
                return null;
            }

            // `params.term` should be the term that is used for searching
            // `data.text` is the text that is displayed for the data object
            var s = jQuery.trim(params.term).toLowerCase();
            var s2 = jQuery.trim(data.text).toLowerCase();
            if (s === s2.substr(0, s.length)) {
                return data;
            }

            // Return `null` if the term should not be displayed
            return null;
        }


        function isNotEmpty(res) { //custom func
            return false;
        }

        function myTemplateResult(res) { //custom func
            if (res.loading) return res.text;
            res.id = res.id;
            if (isNotEmpty(res.code)) {
                return res.code + ":" + res.text;
            } else {
                return res.text;
            }
        }

        function myTemplateSelection(res) { //custom func
            return res.text;
        }

        var selectizecityfield = { //selectize billing city field
            matcher: matchCustom,
            minimumInputLength: 2,
            maximumDisplayOptionsLength: 50,
            templateResult: myTemplateResult,
            templateSelection: myTemplateSelection,

            language: {
                errorLoading: function() {
                    return 'Завантаження.';
                },
                inputTooShort: function() {
                    return "Введіть більше символів...";
                },
                noResults: function() {
                    return 'Нічого не знайдено';
                },
                searching: function() {
                    return 'Пошук…';
                }
            }
        }


        jQuery("#billing_nova_poshta_city").select2(selectizecityfield);
        jQuery("#shipping_nova_poshta_city").select2(selectizecityfield);

        jQuery("#billing_nova_poshta_warehouse").select2();
        jQuery("#billing_nova_poshta_region").select2();
        jQuery("#shipping_nova_poshta_warehouse").select2();
        jQuery("#shipping_nova_poshta_region").select2();

        jQuery("#billing_nova_poshta_region").on("change", function() {
          jQuery("#billing_nova_poshta_city").select2("val", "");
          jQuery("#billing_nova_poshta_warehouse").select2("val", "");
        });
        jQuery("#billing_nova_poshta_city").on("change", function() {
          jQuery("#billing_nova_poshta_warehouse").select2("val", "");
        });
        jQuery("#shipping_nova_poshta_region").on("change", function() {
          jQuery("#shipping_nova_poshta_city").select2("val", "");
          jQuery("#shipping_nova_poshta_warehouse").select2("val", "");
        });
        jQuery("#shipping_nova_poshta_city").on("change", function() {
          jQuery("#shipping_nova_poshta_warehouse").select2("val", "");
        });


    }
    var NovaPoshtaOptions = (function($) {
        var result = {};

        var novaPoshtaBillingOptions = $('#billing_nova_poshta_region, #billing_nova_poshta_city, #billing_nova_poshta_warehouse');
        var billingAreaSelect = $('#billing_nova_poshta_region');
        var billingCitySelect = $('#billing_nova_poshta_city');
        var billingWarehouseSelect = $('#billing_nova_poshta_warehouse');

        var novaPoshtaShippingOptions = $('#shipping_nova_poshta_region, #shipping_nova_poshta_city, #shipping_nova_poshta_warehouse');
        var shippingAreaSelect = $('#shipping_nova_poshta_region');
        var shippingCitySelect = $('#shipping_nova_poshta_city');
        var shippingWarehouseSelect = $('#shipping_nova_poshta_warehouse');

        var shippingMethods = 'justin_shipping_method, nova_poshta_shipping_method';
        var shippinglocalpickup = 'wcso_local_shipping';

        var defaultBillingOptions = $('#billing_address_1, #billing_address_2, #billing_city, #billing_state, #billing_postcode');
        var defaultShippingOptions = $('#shipping_address_1, #shipping_address_2, #shipping_city, #shipping_state, #shipping_postcode');

        var shippingMethod = $("input[name^=shipping_method]");
        var shipToDifferentAddressCheckbox = $('#ship-to-different-address-checkbox');

        var shipToDifferentAddress = function() {
            return shipToDifferentAddressCheckbox.is(':checked');
        };

        var ensureNovaPoshta = function() {
            //TODO this method should be more abstract
            var value = $('input[name^=shipping_method][type=radio]:checked').val();
            if (!value) {
                value = $('input#shipping_method_0').val();
            }
            if (!value) {
                value = $('input[name^=shipping_method][type=hidden]').val();
            }
            if (!value) {
              jQuery.post(NovaPoshtaHelper.ajaxUrl,{action: 'my_action_for_wc_get_chosen_method_ids'}, function(response) {
                  value = response;
              });
            }
            if( (jQuery('#billing_country').val() ) ){
              //console.log( jQuery('#billing_country').val() );
              if(jQuery('#billing_country').val() != 'UA'){
                console.log('185: return false')
                return false;
              }
            }
            if (!value) {
                return true;
            }


            return value === 'nova_poshta_shipping_method';
        };

        //billing
        var enableNovaPoshtaBillingOptions = function() {
            novaPoshtaBillingOptions.each(function() {
                $(this).removeAttr('disabled').closest('.form-row').show();
            });
            disableDefaultBillingOptions();
        };

        var disableNovaPoshtaBillingOptions = function() {
            novaPoshtaBillingOptions.each(function() {
                $(this).attr('disabled', 'disabled').closest('.form-row').hide();
            });
            enableDefaultBillingOptions();
        };

        var enableDefaultBillingOptions = function() {
          if( !(shippingMethods.includes(getNovaPoshta()) )){
            defaultBillingOptions.each(function() {
                $(this).removeAttr('disabled').closest('.form-row').show();
            });
          }
        };

        var disableDefaultBillingOptions = function() {
            if(shippingMethods.includes(getNovaPoshta()) ){
              defaultBillingOptions.each(function() {
                  $(this).attr('disabled', 'disabled').closest('.form-row').hide();
              });
            }
            else{
              console.log('shippingMethods notincludes');
            }

        };

        var getNovaPoshta = function() {
            var value = $('input[name^=shipping_method][type=radio]:checked').val();
            if (!value) {
                value = $('input#shipping_method_0').val();
            }
            if (!value) {
                value = $('input[name^=shipping_method][type=hidden]').val();
            }
            return value;
        };

        //shipping
        var enableNovaPoshtaShippingOptions = function() {
            novaPoshtaShippingOptions.each(function() {
                $(this).removeAttr('disabled').closest('.form-row').show();
            });
            disableDefaultShippingOptions();
        };

        var disableNovaPoshtaShippingOptions = function() {
            novaPoshtaShippingOptions.each(function() {
                $(this).attr('disabled', 'disabled').closest('.form-row').hide();
            });
            enableDefaultShippingOptions();
        };

        var enableDefaultShippingOptions = function() {
            defaultShippingOptions.each(function() {
                $(this).removeAttr('disabled').closest('.form-row').show();
            });
        };

        var disableDefaultShippingOptions = function() {
            defaultShippingOptions.each(function() {
                $(this).attr('disabled', 'disabled').closest('.form-row').hide();
            });
        };

        //common
        var disableNovaPoshtaOptions = function() {
            disableNovaPoshtaBillingOptions();
            disableNovaPoshtaShippingOptions();
        };

        var handleShippingMethodChange = function() {
            disableNovaPoshtaOptions();
            if (ensureNovaPoshta()) {
                if (shipToDifferentAddress()) {
                    enableNovaPoshtaShippingOptions();
                } else {
                    enableNovaPoshtaBillingOptions();
                }
            }
        };

        var initShippingMethodHandlers = function() {
            //TODO check count of call of this method during initialisation and other actions
            $(document).on('change', shippingMethod, function() {
                handleShippingMethodChange();
            });
            $(document).on('change', shipToDifferentAddressCheckbox, function() {
                handleShippingMethodChange();
            });
            $(document.body).bind('updated_checkout', function() {
                handleShippingMethodChange();
            });
            handleShippingMethodChange();
        };

        var initOptionsHandlers = function() {
            billingAreaSelect.on('change', function() {
                var areaRef = this.value;
                $.ajax({
                    url: NovaPoshtaHelper.ajaxUrl,
                    method: "POST",
                    data: {
                        'action': NovaPoshtaHelper.getCitiesAction,
                        'parent_ref': areaRef
                    },
                    success: function(json) {
                        try {
                            var data = JSON.parse(json);
                            billingCitySelect
                                .find('option:not(:first-child)')
                                .remove();

                            $.each(data, function(key, value) {
                                billingCitySelect
                                    .append($("<option></option>")
                                        .attr("value", key)
                                        .text(value)
                                    );
                            });
                            billingWarehouseSelect.find('option:not(:first-child)').remove();

                        } catch (s) {
                            console.log("Error. Response from server was: " + json);
                        }
                    },
                    error: function() {
                        console.log('Error.');
                    }
                });
            });
            billingCitySelect.on('change', function() {
                var cityRef = this.value;
                $.ajax({
                    url: NovaPoshtaHelper.ajaxUrl,
                    method: "POST",
                    data: {
                        'action': NovaPoshtaHelper.getWarehousesAction,
                        'parent_ref': cityRef
                    },
                    success: function(json) {
                        try {
                            var data = JSON.parse(json);
                            billingWarehouseSelect
                                .find('option:not(:first-child)')
                                .remove();

                            $.each(data, function(key, value) {
                                billingWarehouseSelect
                                    .append($("<option></option>")
                                        .attr("value", key)
                                        .text(value)
                                    );
                            });

                        } catch (s) {
                            console.log("Error. Response from server was: " + json);
                        }
                    },
                    error: function() {
                        console.log('Error.');
                    }
                });
            });
            shippingAreaSelect.on('change', function() {
                var areaRef = this.value;
                $.ajax({
                    url: NovaPoshtaHelper.ajaxUrl,
                    method: "POST",
                    data: {
                        'action': NovaPoshtaHelper.getCitiesAction,
                        'parent_ref': areaRef
                    },
                    success: function(json) {
                        try {
                            var data = JSON.parse(json);
                            shippingCitySelect
                                .find('option:not(:first-child)')
                                .remove();

                            $.each(data, function(key, value) {
                                shippingCitySelect
                                    .append($("<option></option>")
                                        .attr("value", key)
                                        .text(value)
                                    );
                            });
                            shippingWarehouseSelect.find('option:not(:first-child)').remove();

                        } catch (s) {
                            console.log("Error. Response from server was: " + json);
                        }
                    },
                    error: function() {
                        console.log('Error.');
                    }
                });
            });
            shippingCitySelect.on('change', function() {
                var cityRef = this.value;
                $.ajax({
                    url: NovaPoshtaHelper.ajaxUrl,
                    method: "POST",
                    data: {
                        'action': NovaPoshtaHelper.getWarehousesAction,
                        'parent_ref': cityRef
                    },
                    success: function(json) {
                        try {
                            var data = JSON.parse(json);
                            shippingWarehouseSelect
                                .find('option:not(:first-child)')
                                .remove();

                            $.each(data, function(key, value) {
                                shippingWarehouseSelect
                                    .append($("<option></option>")
                                        .attr("value", key)
                                        .text(value)
                                    );
                            });

                        } catch (s) {
                            console.log("Error. Response from server was: " + json);
                        }
                    },
                    error: function() {
                        console.log('Error.');
                    }
                });
            });
        };

        result.init = function() {
            initShippingMethodHandlers();
            initOptionsHandlers();
        };

        return result;
    }(jQuery));
    var Calculator = (function($) {
        var result = {};



        var ensureNovaPoshta = function() {
            var value = $('input[name^=shipping_method][type=radio]:checked').val();
            if (!value) {
                value = $('input#shipping_method_0').val();
            }
            return value === 'nova_poshta_shipping_method';
        };

        var addNovaPoshtaHandlers = function() {
            $('#calc_shipping_country').find('option').each(function() {
                //Ship to Ukraine only
                if ($(this).val() !== 'UA') {
                    $(this).remove();
                }
            });
            $('#calc_shipping_state_field').hide();

            var shippingMethod = $('<input type="hidden" id="calc_nova_poshta_shipping_method" value="nova_poshta_shipping_method" name="shipping_method">');
            var cityInputKey = $('<input type="hidden" id="calc_nova_poshta_shipping_city" name="calc_nova_poshta_shipping_city">');
            $('#calc_shipping_city_field').append(cityInputKey).append(shippingMethod);
            var cityInputName = $('#calc_shipping_city');

            cityInputName.autocomplete({
                source: function(request, response) {
                    jQuery.ajax({
                        type: 'POST',
                        url: NovaPoshtaHelper.ajaxUrl,
                        data: {
                            action: NovaPoshtaHelper.getCitiesByNameSuggestionAction,
                            name: request.term
                        },
                        success: function(json) {
                            var data = JSON.parse(json);
                            response(jQuery.map(data, function(item, key) {
                                return {
                                    label: item,
                                    value: key
                                }
                            }));
                        }
                    })
                },
                focus: function(event, ui) {
                    cityInputName.val(ui.item.label);
                    return false;
                },
                select: function(event, ui) {
                    cityInputName.val(ui.item.label);
                    cityInputKey.val(ui.item.value);
                    return false;
                }
            });

            $('form.woocommerce-shipping-calculator').on('submit', function() {
                if ($('#calc_shipping_country').val() !== 'UA') {
                    return false;
                }
            });
        };

        result.init = function() {
            $(document.body).bind('updated_wc_div updated_shipping_method', function() {
                if (ensureNovaPoshta()) {
                    addNovaPoshtaHandlers();
                }
            });

            if (ensureNovaPoshta()) {
                addNovaPoshtaHandlers();
            }
        };

        return result;
    }(jQuery));

    NovaPoshtaOptions.init();
    Calculator.init();

    function saychc() {
      jQuery('#billing_country').trigger('change', []);
    }

    setTimeout(saychc, 600);
});
