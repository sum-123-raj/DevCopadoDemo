import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccountForm extends LightningElement {
    @track showSuccessMessage = false;
    @track showErrorMessage = false;
    @track successMessage = '';
    @track errorMessage = '';

    // Handle form submission
    handleSubmit(event) {
        event.preventDefault();
        
        // Clear any previous messages
        this.clearMessages();
        
        // Get the form data
        const fields = event.detail.fields;
        
        // Basic validation - ensure Name is provided
        if (!fields.Name) {
            this.showError('Account Name is required.');
            return;
        }
        
        // Submit the form
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }

    // Handle successful form submission
    handleSuccess(event) {
        const recordId = event.detail.id;
        
        this.showSuccess(`Account created successfully! Record ID: ${recordId}`);
        
        // Show toast notification
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Account created successfully!',
                variant: 'success'
            })
        );
        
        // Reset the form after successful submission
        this.resetForm();
    }

    // Handle form submission errors
    handleError(event) {
        const errorMessage = event.detail.message || 'An error occurred while creating the account.';
        
        this.showError(errorMessage);
        
        // Show toast notification
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: errorMessage,
                variant: 'error'
            })
        );
    }

    // Reset the form
    resetForm() {
        const inputFields = this.template.querySelectorAll('lightning-input-field');
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
    }

    // Show success message
    showSuccess(message) {
        this.successMessage = message;
        this.showSuccessMessage = true;
        this.showErrorMessage = false;
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
            this.showSuccessMessage = false;
        }, 5000);
    }

    // Show error message
    showError(message) {
        this.errorMessage = message;
        this.showErrorMessage = true;
        this.showSuccessMessage = false;
    }

    // Clear all messages
    clearMessages() {
        this.showSuccessMessage = false;
        this.showErrorMessage = false;
        this.successMessage = '';
        this.errorMessage = '';
    }
}