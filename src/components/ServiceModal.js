import React from 'react';
import { Button } from './ui/button';

const ServiceModal = ({ isOpen, onClose, selectedService, formData, setFormData, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-50 bg-[aliceblue] rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        <h2 className="text-xl font-bold mb-4 text-foreground">
          {selectedService ? 'Edit Service' : 'Add New Service'}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 bg-[aliceblue] border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 bg-[aliceblue] border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              URL
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              className="w-full px-3 py-2 bg-[aliceblue] border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Type
            </label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-3 py-2 bg-[aliceblue] border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {selectedService ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;
